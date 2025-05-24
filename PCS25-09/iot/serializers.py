from rest_framework import serializers
from .models import IoTDevice, SensorData

class IoTDeviceSerializer(serializers.ModelSerializer):
    class Meta:
        model = IoTDevice
        fields = ['id', 'parking_space', 'device_id', 'is_online', 'last_ping']

class SensorDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = SensorData
        fields = ['id', 'device', 'is_occupied', 'timestamp']