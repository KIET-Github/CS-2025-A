from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    VEHICLE_OWNER = 'vehicle_owner'
    PARKING_OWNER = 'parking_owner'
    
    USER_TYPE_CHOICES = [
        (VEHICLE_OWNER, 'Vehicle Owner'),
        (PARKING_OWNER, 'Parking Owner'),
    ]
    
    user_type = models.CharField(max_length=20, choices=USER_TYPE_CHOICES)
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    # Document uploads
    ownership_agreement = models.FileField(upload_to='documents/', null=True, blank=True)
    identity_verification = models.FileField(upload_to='documents/', null=True, blank=True)
    identity_document = models.FileField(upload_to='documents/', null=True, blank=True)
    vehicle_registration = models.FileField(upload_to='documents/', null=True, blank=True)
    
    def __str__(self):
        return f"{self.username} ({self.get_user_type_display()})"