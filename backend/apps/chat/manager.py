from datetime import datetime
from fastapi import WebSocket
from typing import List

class ConnectionManager:
    # Every instance
    active_connections: List[WebSocket] = []

    # WebSocket Open
    async def connect(self, websocket: WebSocket, username: str):
        await websocket.accept()
        self.active_connections.append(websocket)
        await self.send('Join', username)

    #Websocket Close
    async def disconnect(self, websocket: WebSocket, username: str):
        self.active_connections.remove(websocket)
        await self.send('Left', username)

    async def broadcast(self, message: dict):
        """
            El broadcast es un mensaje que se transmite a todos los miembros de una
            red y que no necesita ninguna acción de retroalimentación
        """
        date = datetime.today().strftime("%Y/%m/%d (%H:%M)")
        for connection in self.active_connections:
            await connection.send_json(
                {
                    "msg": message, 
                    "online":len(self.active_connections),
                    "date": f'{date}'
                })
    
    # Function send greeting message
    async def send(self, message: str, username: str):
        for connection in self.active_connections:
            await connection.send_json(
                {
                    "msg":{ 'message': message, 'username': username }, 
                    "online":len(self.active_connections)
                })