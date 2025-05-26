from django.urls import re_path
from . import consumers

websocket_urlpatterns = [
    re_path(r'ws/parking/(?P<parking_id>\w+)/$', consumers.ParkingSensorConsumer.as_async()),
]