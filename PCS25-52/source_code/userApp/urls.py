from django.urls import path
from .views import *
from coreApp.views import *
urlpatterns = [
    path('',home,name='home'),
    path('login/',mylogin,name='login'),
    path('register/',myregister,name='register'),
    # path('task/',task,name='task'),
    path('logout/',myLogout,name='logout')
]
