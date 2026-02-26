from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from typing import List, Dict

app = FastAPI()

class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []
        self.user_map: Dict[WebSocket, str] = {}

    async def connect(self, websocket: WebSocket, username: str):
        await websocket.accept()
        self.active_connections.append(websocket)
        self.user_map[websocket] = username

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)
        self.user_map.pop(websocket, None)

    async def send_personal(self, message: dict, websocket: WebSocket):
        await websocket.send_json(message)

    async def broadcast(self, message: dict):
        for connection in self.active_connections:
            await connection.send_json(message)

manager = ConnectionManager()

@app.websocket("/ws/{username}")
async def websocket_endpoint(websocket: WebSocket, username: str):
    await manager.connect(websocket, username)

    await manager.broadcast({
        "type": "system",
        "message": f"{username} joined"
    })

    try:
        while True:
            data = await websocket.receive_json()

    except WebSocketDisconnect:
        manager.disconnect(websocket)
        await manager.broadcast({
            "type": "system",
            "message": f"{username} left"
        })