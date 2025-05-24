# parking/views.py

from rest_framework import viewsets, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import ParkingSpace, ParkingImage
from .serializers import ParkingSpaceSerializer
from bookings.models import Booking
from django.db.models import Q
from django.utils import timezone
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from parking.models import ParkingSpace
from parking.serializers import ParkingSpaceSerializer
from django.core.exceptions import ValidationError
from .permissions import IsOwnerOrReadOnly

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_parking_owner_spaces(request):
    try:
        user = request.user
        if not user.user_type == 'parking_owner':
            return Response({'error': 'Only parking owners can access this endpoint'}, 
                          status=status.HTTP_403_FORBIDDEN)
            
        spaces = ParkingSpace.objects.filter(owner=user)
        serializer = ParkingSpaceSerializer(spaces, many=True)
        return Response(serializer.data)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
class ParkingSpaceViewSet(viewsets.ModelViewSet):
    serializer_class = ParkingSpaceSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'location']

    def get_queryset(self):
        if self.request.user.is_authenticated and self.request.user.user_type == 'parking_owner':
            return ParkingSpace.objects.filter(owner=self.request.user)
        return ParkingSpace.objects.filter(is_active=True)
    
    def get_permissions(self):
        if self.action in ['list', 'retrieve', 'available', 'search']:
            return [AllowAny()]
        return [IsAuthenticated(), IsOwnerOrReadOnly()]
    
    def perform_create(self, serializer):
        try:
            parking_space = serializer.save(owner=self.request.user)
            image_file = self.request.FILES.get('image')
            if image_file:
                ParkingImage.objects.create(parking_space=parking_space, image=image_file)
        except ValidationError as e:
            raise serializers.ValidationError(e.message_dict)
        except Exception as e:
            raise serializers.ValidationError(str(e))
    
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        image_file = request.FILES.get('image')
        if image_file:
            ParkingImage.objects.create(parking_space=instance, image=image_file)
        return Response(serializer.data)
    
    @action(detail=False, methods=['GET'])
    def available(self, request):
        try:
            date = request.query_params.get('date', timezone.now().date())
            start_time = request.query_params.get('start_time')
            end_time = request.query_params.get('end_time')
            
            spaces = ParkingSpace.objects.filter(is_active=True)
            
            if start_time and end_time:
                booked_spaces = Booking.objects.filter(
                    Q(start_time__lte=end_time) & Q(end_time__gte=start_time),
                    status__in=['pending', 'confirmed']
                ).values_list('parking_space_id', flat=True)
                
                spaces = spaces.exclude(id__in=booked_spaces)
            
            serializer = self.get_serializer(spaces, many=True)
            return Response(serializer.data)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)
