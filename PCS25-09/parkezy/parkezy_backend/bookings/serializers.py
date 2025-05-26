from rest_framework import serializers
from .models import Booking
from parking.serializers import ParkingSpaceSerializer

class BookingSerializer(serializers.ModelSerializer):
    parking_space_detail = ParkingSpaceSerializer(source='parking_space', read_only=True)
    
    class Meta:
        model = Booking
        fields = ['id', 'parking_space', 'parking_space_detail', 'start_time', 'end_time', 
                  'status', 'created_at']
                  