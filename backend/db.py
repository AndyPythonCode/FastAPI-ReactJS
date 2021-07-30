import databases
import sqlalchemy

DATABASE_URL = "sqlite:///./database.db"

# Databases gives you simple asyncio support for a range of databases.
database = databases.Database(DATABASE_URL)

# To represent a table
metadata = sqlalchemy.MetaData()

engine = sqlalchemy.create_engine(
    DATABASE_URL, 
    # It's only need it for SQLite.
    connect_args={ "check_same_thread": False }
)