from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.
from django.core.validators import RegexValidator


class User(AbstractUser):
    email = models.EmailField(verbose_name='email address',max_length=255,unique=True,)
    bio = models.TextField(max_length=500, blank=True, null=True)
    phone_regex = RegexValidator(regex=r'^\+?1?\d{12}$', message="Phone number must be entered in the format: '+999999999'. upto 10 digits.")
    phone_num = models.CharField(validators=[phone_regex], max_length=10, blank=True) # Validators should be a list
    gender = models.CharField(max_length=15)
    dob = models.DateField(auto_now=False,default=False)
    profilepic = models.FileField(upload_to = 'users/pc/', default='default.png')
    courseOrField = models.CharField(max_length=75)
    location = models.CharField(max_length=100, blank=True, null=True)
    followers = models.ManyToManyField('User', blank=True,related_name='all_followers')

    def __str__(self) -> str:
        return f"{self.first_name} {self.last_name}"