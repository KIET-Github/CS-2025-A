from django.urls import path
from .views import *
urlpatterns = [
    # path('',home,name='home'),
    path('task/',tasks,name='task'),
    path('community/',community,name='community'),
    path('yt/',embedded_video,name='yt')
    
]
