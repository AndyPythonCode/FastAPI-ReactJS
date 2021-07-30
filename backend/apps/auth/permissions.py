from fastapi import HTTPException, Depends
from . import schemas, security

# PERMISSIONS
async def get_current_active_user(current_user: schemas.User = Depends(security.get_current_user)):
    if not current_user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user

async def get_current_admin_user(current_user: schemas.User = Depends(security.get_current_user)):
    if not current_user.is_admin:
        raise HTTPException(status_code=400, detail="User is not admin")
    return current_user