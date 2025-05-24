from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Booking
from .serializers import BookingSerializer
from parking.models import ParkingSpace
from django.utils import timezone
from django.db.models import Q

class BookingViewSet(viewsets.ModelViewSet):
    serializer_class = BookingSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        if user.user_type == 'parking_owner':
            # For parking owners, show bookings for their spaces
            return Booking.objects.filter(parking_space__owner=user)
        else:
            # For vehicle owners, show their own bookings
            return Booking.objects.filter(user=user)
    
    def perform_create(self, serializer):
        parking_space_id = self.request.data.get('parking_space')
        start_time = self.request.data.get('start_time')
        end_time = self.request.data.get('end_time')
        
        # Check if space is available for this time
        if Booking.objects.filter(
            Q(start_time__lte=end_time) & Q(end_time__gte=start_time),
            parking_space_id=parking_space_id,
            status__in=['pending', 'confirmed']
        ).exists():
            return Response(
                {'error': 'This parking space is not available for the selected time.'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        serializer.save(user=self.request.user)
    
    @action(detail=True, methods=['POST'])
    def cancel(self, request, pk=None):
        booking = self.get_object()
        
        if booking.status == 'confirmed' and booking.start_time <= timezone.now():
            return Response(
                {'error': 'Cannot cancel a booking that has already started.'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        booking.status = 'cancelled'
        booking.save()
        
        return Response({'status': 'Booking cancelled'})
    
    @action(detail=False, methods=['GET'])
    def today(self, request):
        user = request.user
        today = timezone.now().date()
        
        if user.user_type == 'parking_owner':
            # Get today's bookings for parking owner's spaces
            queryset = Booking.objects.filter(
                parking_space__owner=user,
                start_time__date=today,
                status='confirmed'
            )
        else:
            # Get today's bookings for vehicle owner
            queryset = Booking.objects.filter(
                user=user,
                start_time__date=today,
                status='confirmed'
            )
        
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)