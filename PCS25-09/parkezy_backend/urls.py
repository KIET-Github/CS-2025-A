from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from django.conf import settings
from django.conf.urls.static import static
from users.views import RegisterView, login_view, UserProfileView
from parking.views import ParkingSpaceViewSet, get_parking_owner_spaces
from bookings.views import BookingViewSet
from iot.views import IoTDeviceViewSet, iot_device_auth

router = DefaultRouter()
router.register(r'parking-spaces', ParkingSpaceViewSet, basename='parking-space')
router.register(r'bookings', BookingViewSet, basename='booking')
router.register(r'iot-devices', IoTDeviceViewSet, basename='iot-device')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/auth/', include('social_django.urls', namespace='social')),
    path('api/register/', RegisterView.as_view(), name='register'),
    path('api/login/', login_view, name='login'),
    path('api/profile/', UserProfileView.as_view(), name='profile'),
    path('api/iot-auth/', iot_device_auth, name='iot-auth'),
    path('api/parking-owner/spaces/', get_parking_owner_spaces, name='get_parking_owner_spaces'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)