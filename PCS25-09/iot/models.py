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
    
class ParkingSlot(models.Model):
    slot_id=models.CharField(max_length=100,unique=True)
    latitude = models.FloatField(default=0.0)
 # Latitude of the slot
    longitude = models.FloatField(default=0.0)  # Longitude of the slot
    status = models.CharField(max_length=20, choices=[('vacant', 'Vacant'), ('occupied', 'Occupied')])
    cost = models.DecimalField(max_digits=10, decimal_places=2,default=25)
    area = models.CharField(max_length=255,default='Unknown')  # New field added

    def _str_(self):
        return f"Slot{self.slot_id} is{self.status}"

# Create your models here.
