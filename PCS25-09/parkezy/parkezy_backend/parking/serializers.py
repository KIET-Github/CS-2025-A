from rest_framework import serializers
from .models import ParkingSpace, ParkingSlot, ParkingImage

class ParkingSlotSerializer(serializers.ModelSerializer):
    class Meta:
        model = ParkingSlot
        fields = ['id', 'slot_number', 'slot_type', 'status']
        read_only_fields = ['id', 'slot_number']

class ParkingImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ParkingImage
        fields = ['id', 'image']
        read_only_fields = ['id']

class ParkingSpaceSerializer(serializers.ModelSerializer):
    slots = ParkingSlotSerializer(many=True, required=False)
    images = ParkingImageSerializer(many=True, read_only=True)
    owner_username = serializers.ReadOnlyField(source='owner.username')
    owner = serializers.PrimaryKeyRelatedField(read_only=True)
    
    class Meta:
        model = ParkingSpace
        fields = [
            'id', 'name', 'location', 'price_per_hour', 
            'available_from', 'available_to', 'max_duration', 
            'is_active', 'created_at', 'owner', 'owner_username', 
            'slots', 'images',
            'latitude', 'longitude'
        ]
        read_only_fields = ['id', 'owner', 'created_at', 'images']

    def create(self, validated_data):
        slots_data = validated_data.pop('slots', [])
        parking_space = ParkingSpace.objects.create(**validated_data)
        # Create slots if provided, auto-assign slot_number
        for idx, slot_data in enumerate(slots_data, start=1):
            ParkingSlot.objects.create(parking_space=parking_space, slot_number=idx, **slot_data)
        return parking_space

    def update(self, instance, validated_data):
        slots_data = validated_data.pop('slots', None)
        # Update parking space fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        # Update slots if provided
        if slots_data is not None:
            # Delete existing slots
            instance.slots.all().delete()
            # Create new slots, auto-assign slot_number
            for idx, slot_data in enumerate(slots_data, start=1):
                ParkingSlot.objects.create(parking_space=instance, slot_number=idx, **slot_data)
        return instance
