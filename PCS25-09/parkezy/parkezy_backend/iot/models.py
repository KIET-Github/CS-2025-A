from django.db import models
from parking.models import ParkingSpace

class IoTDevice(models.Model):
    parking_space = models.OneToOneField(ParkingSpace, on_delete=models.CASCADE, related_name='iot_device')
    device_id = models.CharField(max_length=100, unique=True)
    is_online = models.BooleanField(default=False)
    last_ping = models.DateTimeField(null=True, blank=True)
    
    def __str__(self):
        return f"IoT Device for {self.parking_space.name}"

class SensorData(models.Model):
    device = models.ForeignKey(IoTDevice, on_delete=models.CASCADE, related_name='sensor_data')
    is_occupied = models.BooleanField()
    timestamp = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        status = "Occupied" if self.is_occupied else "Vacant"
        return f"{self.device.parking_space.name}: {status} at {self.timestamp}"