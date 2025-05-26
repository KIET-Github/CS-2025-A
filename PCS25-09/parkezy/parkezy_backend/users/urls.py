from django.urls import path
from .views import RegisterView, login_view, UserProfileView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', login_view, name='login'),
    path('profile/', UserProfileView.as_view(), name='profile'),
]
