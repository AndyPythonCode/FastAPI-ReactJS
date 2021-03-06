from fastapi.param_functions import Form
from fastapi.security import OAuth2PasswordRequestForm
from datetime import datetime
from pydantic import BaseModel, EmailStr
from typing import Optional

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[EmailStr] = None

class User(BaseModel):
    id: Optional[int]
    username: str
    email: EmailStr
    img: Optional[str]
    is_active: Optional[bool] = True
    is_admin: Optional[bool] = False
    date_joined: Optional[datetime] = datetime.now()

class UserInDB(User):
    password: str

class UserUpdate(BaseModel):
    username: Optional[str]
    email: Optional[EmailStr]
    img: Optional[str]
    password: Optional[str]

class UserIn(BaseModel):
    email: EmailStr
    username: str
    password: str

class ForgotPassword(BaseModel):
    email: EmailStr

class ResetPassword(BaseModel):
    password: str

# Overwriting default form-data fastapi to uses username (email) instead of (str)
class OAuth2PasswordRequestFormCustom(OAuth2PasswordRequestForm):
    def __init__(
        self,
        grant_type: str = Form(None, regex="password"),
        username: EmailStr = Form(...),
        password: str = Form(...),
        scope: str = Form(""),
        client_id: Optional[str] = Form(None),
        client_secret: Optional[str] = Form(None),
    ):
        super().__init__(grant_type, username, password, scope, client_id, client_secret)