import json
from channels.generic.websocket import AsyncWebsocketConsumer

class ParkingSensorConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.parking_id = self.scope['url_route']['kwargs']['parking_id']
        self.room_group_name = f'parking_{self.parking_id}'
        
        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        
        await self.accept()
    
    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )
    
    # Receive message from WebSocket
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        
        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'sensor_update',
                'message': message
            }
        )
    
    # Receive message from room group
    async def sensor_update(self, event):
        message = event['message']
        
        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'message': message
        }))