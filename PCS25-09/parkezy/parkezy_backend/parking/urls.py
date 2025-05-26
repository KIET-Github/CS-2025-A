from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ParkingSpaceViewSet, get_parking_owner_spaces

router = DefaultRouter()
router.register(r'parking-spaces', ParkingSpaceViewSet, basename='parking-space')

urlpatterns = [
    path('', include(router.urls)),
    path('api/parking-owner/spaces', get_parking_owner_spaces, name='get_parking_owner_spaces'),
]
