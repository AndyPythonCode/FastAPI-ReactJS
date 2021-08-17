from pathlib import Path
from fastapi.middleware.cors import CORSMiddleware
from decouple import config

# DESCRIPTION
API_METADATA = {
    'title': 'Init',
    'description': 'Welcome to FastAPI',
    'version': '0.0.1',
}

# Build paths inside the project like this: BASE_DIR / 'backend'.
BASE_DIR = Path(__file__).resolve().parent

# SECURITY WARNING: keep the secret key used in production secret!
# TO GET A KEY STRING RUN: [openssl rand -hex 42] OR [openssl rand -base64 42]
SECRET_KEY = config('SECRET_KEY')

ALGORITHM = "HS256"

ACCESS_TOKEN_EXPIRE_HOURS = 12

ALLOWED_HOSTS = ['http://localhost:8000','http://localhost:3000']

# Cross-Origin Resource Sharing
MIDDLEWARE = {
    'middleware_class': CORSMiddleware,
    'allow_origins': ALLOWED_HOSTS or ['*'],
    'allow_credentials': True,
    'allow_methods': ["*"],
    'allow_headers': ["*"],
}

# STATICFILES
TEMPLATE = Path.joinpath(BASE_DIR, 'static/index.html')
STATIC_FILES = Path.joinpath(BASE_DIR, 'static')

# SEND EMAIL
EMAIL_ADDRESS = config('EMAIL_ADDRESS')
EMAIL_PASSWORD = config('EMAIL_PASSWORD')