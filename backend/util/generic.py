# https://docs.sqlalchemy.org/en/13/core/tutorial.html
# CRUD common command in a database

from databases.core import Database
from sqlalchemy import Table
from pydantic import BaseModel
from fastapi import HTTPException, status
from backend.db import database

class ViewSets:
    """
        ________________________________Example________________________________

        generic = ViewSets(your_table)

        @app.get('/example'):
        async def Example():
            return await generic.List_Objects()
    """
    def __init__(self, models: Table) -> None:
        self.models = models
        self.database: Database = database
    
    async def List_Objects(self):
        query = self.models.select()
        return await self.database.fetch_all(query)

    async def Get_Object(self, id: int):
        query = self.models.select().where(self.models.c.id == id) # c attribute is an alias for the FromClause.columns atttribute
        item = await self.database.fetch_one(query)
        if not item:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Not found in database') 
        return item
    
    async def Create_Object(self, request: BaseModel):
        query = self.models.insert().values(**request.dict())
        last_record = await self.database.execute(query)
        return { 'id':last_record, **request.dict() }
    
    async def Updated_Object(self, id: int, request: BaseModel): #If there's a value, i will insert it 
        query = self.models.update().where(self.models.c.id == id).values(**{key: value for key, value in request.dict().items() if value})
        last_record = await self.database.execute(query)
        if not last_record:
             raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Not found in database') 
        return {'id':last_record, **{key: value for key, value in request.dict().items() if value}}
    
    async def Delete_Object(self, id: int):
        query = self.models.delete().where(self.models.c.id == id)
        last_record = await self.database.execute(query)
        if not last_record:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Not found in database') 
        return {'Success':'deleted'}