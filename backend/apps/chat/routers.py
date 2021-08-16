from fastapi import APIRouter, WebSocket, Depends
from .manager import ConnectionManager
from backend.util.generic import ViewSets
from backend.apps.auth import models, schemas, encrypt, permissions

router_chat = APIRouter(prefix='/chat', tags=['CHAT'])

generic = ViewSets(models.ModelUser)

"""
Conceptos clave a utilizar:
___________________________________________TCP_________________________________________________ 
(Protocolo de Control de Transmisión, por sus siglas en inglés Transmission Control Protocol)
permite establecer una conexión entre dos puntos terminales en una red informática común que posibilite
un intercambio mutuo de datos. En este proceso, cualquier pérdida de datos se detecta y resuelve, por
lo que se considera un protocolo fiable.

________________________________________WebSocket_________________________________________________ 
Es un protocolo de red basado en TCP que establece cómo deben intercambiarse datos entre redes. 
Puesto que es un protocolo fiable y eficiente, es utilizado por prácticamente todos los clientes. 
El protocolo TCP establece conexiones entre dos puntos finales de comunicación, llamados sockets. 
De esta manera, el intercambio de datos puede producirse en las dos direcciones.

En concreto, WebSocket permite así una comunicación directa entre una aplicación web y un servidor WebSocket. 
En otras palabras: la web que se solicita se muestra en tiempo real.
"""

manager = ConnectionManager()

@router_chat.websocket("/chat/ws/{username}")
async def websocket_endpoint(websocket: WebSocket, username: str):
    await manager.connect(websocket, username)
    try:
        while True:
            data = await websocket.receive_json() # dict
            await manager.broadcast(data) 
    except:
        await manager.disconnect(websocket, username)

@router_chat.post('/profile/{id}')
async def UploadImage(id: int, user: schemas.UserUpdate, current_user: schemas.User = Depends(permissions.get_current_active_user)):
    user_dict = dict(user)
    for key, value in user_dict.items():
        if key == 'password':
            if value:
                user_dict['password'] = encrypt.get_password_hash(user_dict['password'])
    return await generic.Updated_Object(id, schemas.UserUpdate(**user_dict))