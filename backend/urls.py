from backend.apps.auth.routers import router_user
from backend.apps.chat.routers import router_chat

URL_PATTERNS = (
    router_user,
    router_chat,
)