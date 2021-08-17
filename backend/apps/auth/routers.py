import smtplib
from typing import List
from email.message import EmailMessage

from pydantic.networks import EmailStr
from backend import settings, db
from fastapi import APIRouter, Response, Request
from . import schemas, models, encrypt, permissions
from .security import *

router_user = APIRouter(prefix='/auth', tags=['AUTH'])

# TOKEN
@router_user.post("/token", response_model=schemas.Token)
async def login_for_access_token(response: Response, form_data: schemas.OAuth2PasswordRequestFormCustom = Depends()):
    user = await authenticate_user(form_data.username, form_data.password) # Looking for user
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(hours=settings.ACCESS_TOKEN_EXPIRE_HOURS) # adding time
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    response.set_cookie('user_in', value=f'{datetime.utcnow() + access_token_expires}') # Set cookie when expires token
    response.set_cookie('access_token', value=f'bearer {access_token}', httponly=True)
    return {"access_token": access_token, "token_type": "bearer"}

# REGISTER
@router_user.post('/register')
async def register_user(request: schemas.UserIn):
    user_dict = request.dict()
    user_dict['password'] = encrypt.get_password_hash(user_dict['password'])
    user_dict = schemas.UserInDB(**user_dict).dict() # Some property by default

    # UNIQUE FIELDS
    UNIQUE = models.ModelUser.select().where(models.ModelUser.c.email == user_dict['email'])
    email = await database.fetch_one(UNIQUE)
    if email:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='There is a user with that email')

    UNIQUE = models.ModelUser.select().where(models.ModelUser.c.username == user_dict['username'])
    username = await database.fetch_one(UNIQUE)
    if username:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='There is a user with that username')

    # REGISTER USER
    query = models.ModelUser.insert().values(**user_dict)
    await db.database.execute(query)
    return {'Success': 'User created'}

# LIST USER
@router_user.get("/users", response_model=List[schemas.User])
async def read_users_me(_: schemas.User = Depends(permissions.get_current_active_user)):
    query = models.ModelUser.select()
    return await db.database.fetch_all(query)

# CURRENT USER ACTIVE
@router_user.get("/users/me", response_model=schemas.User)
async def read_users_me(current_user: schemas.User = Depends(permissions.get_current_active_user)):
    return current_user

# CURRENT USER ACTIVE ADMIN
@router_user.get("/users/admin", response_model=schemas.User)
async def read_users_me_admin(current_user: schemas.User = Depends(permissions.get_current_admin_user)):
    return current_user

# IF HTTPONLY COOKIE IS VALID
@router_user.get('/users/is-in', response_model=dict[str, bool])
def read_users_is_in(request: Request):
    try:
        user_in = datetime.fromisoformat(request.cookies.get('user_in')) # string utc to datetime utc    
        if user_in >= datetime.utcnow(): # check if user token is active
            return {'is_logged': True}
        raise HTTPException
    except:
        return {'is_logged': False}

# DELETE COOKIE TOKEN
@router_user.get('/users/logout', response_model=dict[str, bool])
def users_logout(response: Response):
    try:
        response.delete_cookie('user_in')
        response.delete_cookie('access_token')
        return {'logout': True}
    except:
        return {'logout': False}

# Forgot PASSWORD
@router_user.post('/users/forgot-password')
async def users_forgot_password(form: schemas.ForgotPassword):
    query = models.ModelUser.select().where(models.ModelUser.c.email == form.email)
    user = await db.database.fetch_one(query)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Incorrect email",
        )
    access_token = create_access_token(
        data={'sub':user.email}, expires_delta=timedelta(hours=24)
    )
    msg = EmailMessage()
    msg['Subject'] = 'Forgot-password FastRoom'
    msg['From'] = settings.EMAIL_ADDRESS 
    msg['To'] = form.email
    
    HTML: str = f"""
<!DOCTYPE html>
<html>

<body style="margin:0;padding:0;">
    <div style="background:#fff">
        <div style="max-width:100%;margin:0px auto;">
            <table align="center" border="0" cellpadding="0" cellspacing="0" style="width:100%; background-color:#fff;">
                <tbody>
                    <tr>
                        <td>
                            <div style="max-width:100%;box-sizing:border-box; background:#161616">
                                <div
                                    style="width:100%;max-width:575px;min-width:300px;margin:auto;text-align:center;padding:15px">
                                    <img src="https://i.ibb.co/0DBMQrr/speedometer-arrow-speed.jpg"
                                        style="height: 110px;">
                                </div>
                                <div
                                    style="width:100%;max-width:575px;min-width:300px;background:#fff;margin:auto;box-sizing:border-box;border-radius:4px;border-bottom-left-radius:0;border-bottom-right-radius:0;padding:50px 30px 10px;">
                                    <h1
                                        style="box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';color:#3d4852;font-size:18px;font-weight:bold;margin-top:0;text-align:left">
                                        Forgot password?
                                    </h1>
                                    <a target="_blank"
                                        href='http://localhost:3000/reset-password/{access_token}'
                                        style="box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';font-size:16px;line-height:1.5em;margin-top:0;text-align:left">
                                        Reset password
                                    </a>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div
                                style="width:100%;max-width:575px;min-width:300px;margin-left:auto;margin-right:auto; box-sizing:border-box;border-radius:4px;border-top-left-radius:0;border-top-right-radius:0;padding:10px 30px 50px; box-shadow: 5px 5px 5px #dadada;">

                                <p
                                    style="box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';font-size:16px;line-height:1.5em;margin-top:0;text-align:left">
                                    It is only valid for 24 hours, after that time you will not have to request another
                                    link
                                </p>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</body>

</html>
    """
    msg.set_content(HTML, subtype='html')

    with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
        smtp.login(settings.EMAIL_ADDRESS, settings.EMAIL_PASSWORD) 
        smtp.send_message(msg)

    return 'It has been sent'

# Forgot PASSWORD
@router_user.post('/users/reset-password/{token}')
async def users_reset_password(token: str, request : schemas.ResetPassword):
    email: str
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate token",
    )
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        email = payload.get("sub")
        if not email:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    user = await get_user(email)
    if not user:
        raise credentials_exception
    
    new_user = request.dict()
    new_user['password'] = encrypt.get_password_hash(new_user['password'])
    query = models.ModelUser.update().where(models.ModelUser.c.email == email).values(**new_user)
    await db.database.execute(query)
    return 'Saved it'