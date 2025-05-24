from django.db import models
from users.models import User

class ParkingSpace(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='parking_spaces')
    name = models.CharField(max_length=100)
    location = models.CharField(max_length=255)
    price_per_hour = models.DecimalField(max_digits=6, decimal_places=2)
    available_from = models.TimeField()
    available_to = models.TimeField()
    max_duration = models.IntegerField(help_text="Maximum parking duration in hours")
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)

    def __str__(self):
        return f"{self.name} at {self.location}"

class ParkingSlot(models.Model):
    TWO_WHEELER = 'two_wheeler'
    FOUR_WHEELER = 'four_wheeler'
    SLOT_TYPE_CHOICES = [
        (TWO_WHEELER, 'Two Wheeler'),
        (FOUR_WHEELER, 'Four Wheeler'),
    ]

    AVAILABLE = 'available'
    OCCUPIED = 'occupied'
    OUT_OF_ORDER = 'out_of_order'
    STATUS_CHOICES = [
        (AVAILABLE, 'Available'),
        (OCCUPIED, 'Occupied'),
        (OUT_OF_ORDER, 'Out of Order'),
    ]

    parking_space = models.ForeignKey(ParkingSpace, on_delete=models.CASCADE, related_name='slots')
    slot_number = models.PositiveIntegerField()
    slot_type = models.CharField(max_length=20, choices=SLOT_TYPE_CHOICES, default=FOUR_WHEELER)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default=AVAILABLE)

    def __str__(self):
        return f"Slot {self.slot_number} in {self.parking_space.name}"

class ParkingImage(models.Model):
    parking_space = models.ForeignKey(ParkingSpace, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='parking_spaces/')
    
    def __str__(self):
        return f"Image for {self.parking_space.name}"