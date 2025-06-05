from rest_framework import generics, permissions, status
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.contrib.auth.hashers import check_password
from .models import UserProfile
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView

from .serializers import (
    UserSerializer,
    UserProfileSerializer,
    ChangePasswordSerializer
)

# for letting users follow each other
class FollowUserView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, user_id):
        target_user = get_object_or_404(User, id=user_id)

        # probably don't need this
        if request.user == target_user:
            return Response({"detail": "You cannot follow yourself"}, status=status.HTTP_400_BAD_REQUEST)

        if target_user.profile.followers.filter(id=request.user.id).exists():
            target_user.profile.followers.remove(request.user)
            return Response({"detail": "you unfollowed.", "is_following": False})
        else: 
            target_user.profile.followers.add(request.user)
            return Response({"detail": "you followed.", "is_following": True})

# for letting users unfollow another user
class UnfollowUserView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, user_id):
        target_user = get_object_or_404(User, id=user_id)

        target_user.profile.followers.remove(request.user)
        return Response({"detail": "you unfollowed userID {user_id}."}, status=status.HTTP_200_OK)
    
# for letting us see some other person's public profile and from there navigate to the following page
class PublicProfileView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, user_id, *args, **kwargs):
        target_user = get_object_or_404(User, id=user_id)
        profile = target_user.profile
        serializer = UserProfileSerializer(profile, context={"request": request})

        # we need to check if the logged in user is following the other person in question
        is_following = profile.followers.filter(id=request.user.id).exists()

        return Response({**serializer.data, "is_following": is_following})


# for seeing our profile
class UserProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user.profile

# for updating our profile
class UpdateUserView(generics.UpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user
    

# for updating our password
class ChangePasswordView(generics.UpdateAPIView):
    serializer_class = ChangePasswordSerializer
    model = User
    permission_classes = [permissions.IsAuthenticated]

    def update(self, request, *args, **kwargs):
        user = request.user
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            if not check_password(serializer.validated_data['old_password'], user.password):
                return Response({"old_password": "Incorrect password."}, status=status.HTTP_400_BAD_REQUEST)

            user.set_password(serializer.validated_data['new_password'])
            user.save()
            return Response({"detail": "Password updated successfully."})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

