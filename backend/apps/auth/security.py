from fastapi import Depends, HTTPException, status
from backend.db import database
from typing import Optional
from backend import settings
from datetime import datetime, timedelta
from jose import JWTError, jwt
from . import schemas, models, encrypt, cookies

# Custom (httponly cookie) include
oauth2_scheme = cookies.OAuth2PasswordBearerWithCookie(tokenUrl="/auth/token") # Authorize green button url

# Get if user exists
async def get_user(email: str):
    query = models.ModelUser.select().where(models.ModelUser.c.email == email)
    item = await database.fetch_one(query)
    if item:
        return schemas.UserInDB(**item) # Return user with these fields

# Authentication match    
async def authenticate_user(email: str, password: str):
    user = await get_user(email)
    if not user:
        return False
    if not encrypt.verify_password(password, user.password): # see if match
        return False
    return user

# Encode JWT 
def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy() # new dict
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15) # if not have expires add it one
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return encoded_jwt

# Decode JWT
async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        email: str = payload.get("sub") # signature email
        if email is None:
            raise credentials_exception
        token_data = schemas.TokenData(email=email)
    except JWTError:
        raise credentials_exception
    user = await get_user(email=token_data.email)
    if user is None:
        raise credentials_exception
    return user