from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserProfile
from social.models import Post
from social.serializers import PostSerializer  

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']
        extra_kwargs = {"password": {"write_only": True}}

class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)

class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    user_posts = PostSerializer(many=True, source='user.posts', read_only=True)
    followers_count = serializers.IntegerField()
    following_count = serializers.IntegerField(read_only=True)


    class Meta:
        model = UserProfile
        fields = [
            'user', 'dietary_preferences',
            'bookmarked_posts',
            'followers_count', 'following_count',
            'user_posts'
        ]
