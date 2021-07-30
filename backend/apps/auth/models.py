import sqlalchemy
from backend.db import metadata

ModelUser = sqlalchemy.Table(
    "user",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True, autoincrement=True),
    sqlalchemy.Column("username", sqlalchemy.String(80), unique=True),
    sqlalchemy.Column("email", sqlalchemy.String(80), unique=True),
    sqlalchemy.Column("full_name", sqlalchemy.String(255)),
    sqlalchemy.Column("password", sqlalchemy.String(255)),
    sqlalchemy.Column("is_active", sqlalchemy.Boolean),
    sqlalchemy.Column("is_admin", sqlalchemy.Boolean),
    sqlalchemy.Column("date_joined", sqlalchemy.DateTime),
)