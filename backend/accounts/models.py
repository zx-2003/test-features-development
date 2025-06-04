from django.db import models
from django.conf import settings
from social.models import Post

class UserProfile(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='profile'
    )
    username = models.CharField(max_length=150, blank=True)  

    dietary_preferences = models.JSONField(default=list, blank=True)
    cuisine_preferences = models.JSONField(default=list, blank=True)

    profile_picture = models.ImageField(upload_to='profile_pictures/', null=True, blank=True)
    
    bookmarked_posts = models.ManyToManyField(Post, blank=True, related_name='bookmarked_by')
    followers = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='following', blank=True)

    def __str__(self):
        return self.user.username

    @property
    def followers_count(self):
        return self.followers.count()

    @property
    def following_count(self):
        return self.user.following.count()

