from django.urls import path
from .views import available_parking_slots, update_location, filter_parking_slots

urlpatterns = [
    path('', available_parking_slots, name='available_parking_slots'),
    path('update-location/', update_location, name='update_location'),
    path('filter/', filter_parking_slots, name='filter_parking_slots'),
]