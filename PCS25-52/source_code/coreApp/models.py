from django.db import models
from userApp.models import User

# Create your models here.
# class Task(models.Model):
#     title = models.CharField(max_length=150)
    
class Task(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=400)
    created_at = models.DateTimeField(auto_now_add=True)
    is_completed = models.BooleanField(default=False)
    is_shared = models.BooleanField(default=False)
    
    def __str__(self) -> str:
        return self.title
    
class Video(models.Model):
    
    task = models.ForeignKey(Task, on_delete=models.CASCADE)
    title = models.CharField(max_length=10000000)
    thumbnail = models.FileField(upload_to = 'videos/cover/', default='default.png')
    duration = models.IntegerField(default=0)
    url = models.CharField(max_length=701)
    score = models.IntegerField(default=0)
    
    def __str__(self) -> str:
        return f'{self.task.title} {self.title}' 
    
    def save(self, *args, **kwargs):
           super(Video, self).save(*args, **kwargs)
           self.title = str(self.title.encode('unicode_escape'))

    
class Interest(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    interest = models.ForeignKey("Topic",on_delete = models.CASCADE)
    
class Topic(models.Model):
    name = models.CharField(max_length=100)
    def __str__(self) -> str:
        return self.name 

class Blog(models.Model):
    title = models.CharField(max_length=1000)
    description = models.TextField(blank=True,null = True)
    thumbnail = models.FileField(upload_to = 'blog/cover/', default='default.png')
    url = models.CharField(max_length=2000)
    
    def __str__(self) -> str:
        return f'{self.task.title} {self.title}' 
    
class Trending(models.Model):
    title = models.CharField(max_length=1000)
    description = models.TextField(blank=True,null = True)
    thumbnail = models.FileField(upload_to = 'trending/cover/', default='default.png')
    url = models.CharField(max_length=2000)
    
    def __str__(self) -> str:
        return f'{self.task.title} {self.title}' 
    
class Post(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    images = models.ImageField(upload_to = 'posts/images/', default='default.png',blank=True,null=True)
    body = models.TextField()
    
    created_at = models.DateTimeField(auto_now_add=True)
    likes = models.ManyToManyField(User, blank=True, related_name='likes')

    def __str__(self) -> str:
        return f'{self.user} {self.body[:50]}'