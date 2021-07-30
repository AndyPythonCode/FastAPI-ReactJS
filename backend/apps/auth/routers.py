from backend import settings, db
from fastapi import APIRouter, Response
from . import schemas, models, encrypt, permissions
from .security import *

router_user = APIRouter(prefix='/auth', tags=['AUTH'])

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
    response.set_cookie('access_token', value=f'bearer {access_token}', httponly=True)
    return {"access_token": access_token, "token_type": "bearer"}

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

@router_user.get("/users/me", response_model=schemas.User)
async def read_users_me(current_user: schemas.User = Depends(permissions.get_current_active_user)):
    return current_user

@router_user.get("/users/admin", response_model=schemas.User)
async def read_users_me(current_user: schemas.User = Depends(permissions.get_current_admin_user)):
    return current_user