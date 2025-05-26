from rest_framework import viewsets, status
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import IoTDevice, SensorData
from .serializers import IoTDeviceSerializer, SensorDataSerializer
import json
from django.utils import timezone
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

class IoTDeviceViewSet(viewsets.ModelViewSet):
    serializer_class = IoTDeviceSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return IoTDevice.objects.filter(parking_space__owner=self.request.user)
    
    @action(detail=True, methods=['POST'])
    def update_status(self, request, pk=None):
        device = self.get_object()
        is_occupied = request.data.get('is_occupied', False)
        
        # Create new sensor data entry
        sensor_data = SensorData.objects.create(
            device=device,
            is_occupied=is_occupied
        )
        
        # Update device's last ping time
        device.is_online = True
        device.last_ping = timezone.now()
        device.save()
        
        # Send real-time update via WebSocket
        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            f"parking_{device.parking_space.id}",
            {
                "type": "sensor_update",
                "message": {
                    "parking_id": device.parking_space.id,
                    "is_occupied": is_occupied,
                    "timestamp": sensor_data.timestamp.isoformat()
                }
            }
        )
        
        return Response({'status': 'updated'})

@api_view(['POST'])
def iot_device_auth(request):
    device_id = request.data.get('device_id')
    api_key = request.data.get('api_key')
    
    # Simple authentication for IoT devices
    # In production, use a more secure approach
    if not device_id or api_key != 'DEVICE_SECRET_KEY':
        return Response({'error': 'Unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)
    
    try:
        device = IoTDevice.objects.get(device_id=device_id)
        return Response({'status': 'authenticated'})
    except IoTDevice.DoesNotExist:
        return Response({'error': 'Device not found'}, status=status.HTTP_404_NOT_FOUND)