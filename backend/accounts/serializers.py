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
    profile_picture = serializers.ImageField(required=False, allow_null=True)

    # handling obtaining the profile picture because we need to get the absolute path to the picture
    def get_profile_picture(self, obj):
        if obj.profile_picture:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.profile_picture.url)
            return obj.profile_picture.url
        return None

    # this is basically saying that we can only accept a list of strings for this field. It can be empty as well.
    # each item in the list must be one of the choices. List can be empty, it's optional also. 
    dietary_requirements = serializers.ListField(
        child = serializers.ChoiceField(choices=[
            "vegetarian", "vegan", "halal", "kosher", "gluten_free", "dairy_free", "nut_free",
        ]),
        allow_empty=True,
        required=False,
    )

    dietary_preferences = serializers.ListField(
        child=serializers.ChoiceField(choices=[
            "italian", "japanese", "thai", "indian", "chinese", "mexican", "korean", "french", 
            "african", "american", "asian", "brazilian", "greek", "indonesian", "spanish", "turkish", 
            "mediterranean", "lebanese", "middle_eastern",
        ]),
        allow_empty=True,
        required=False,
    )

    class Meta:
        model = UserProfile
        fields = [
            'user', 'dietary_requirements', 'dietary_preferences',
            'bookmarked_posts',
            'followers_count', 'following_count',
            'user_posts', 'profile_picture',
        ]