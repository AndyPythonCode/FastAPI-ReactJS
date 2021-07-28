from fastapi import APIRouter, Response, Request

router_user = APIRouter(prefix='/auth', tags=['AUTH'])

URL_PATTERNS = (
    router_user,
)

@router_user.get('/set')
def CookieSet(response: Response):
    response.set_cookie('token', value='lorem lorem', httponly=True)
    return 'set token'

@router_user.get('/get')
def CookieGet(request: Request):
    return request.cookies.get('token')