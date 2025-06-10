from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics 
from .serializers import UserSerializer, PostSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Post
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Like

# generics.blah blah handles 2 kinds of http requests being Post and get
# permission classes determine who can view the info
# queryset determines what the user will see / what info is available to user or what we can work with
# perform create sets the author to whoever wrote the post
# serializer_class = blah blah tells the serializer to handle all the input and output data for this view
# e.g: DRF will use UserSerializer to validate and parse the JSON sent by the client (e.g. during registration).
# e.g: Output (response): DRF will use UserSerializer to convert Python model instances 
# (e.g. a User object) into JSON that the frontend can understand.

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class PostListCreate(generics.ListCreateAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Post.objects.filter(author=user)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

class PublicPostListCreate(APIView):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self, request, user_id):
        target_user_posts = Post.objects.filter(author=user_id)
        return target_user_posts

class PostListCreateExplore(generics.ListCreateAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Post.objects.exclude(author=self.request.user)
    
    def get_serializer_context(self):
        return {'request': self.request}
    
# now for the people that you are following, to see thier posts.
class FollowingListExplore(generics.ListCreateAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        followed_profiles = user.following.all()
        followed_users = [profile.user for profile in followed_profiles]
        # this will help to return us the posts for users for which our author is following them
        # (author is in the list of followed users)
        # just in case exclude the author's post, although there is no way the author should be able to follow themselves
        return Post.objects.filter(author__in=followed_users).exclude(author=self.request.user)


class PostDelete(generics.DestroyAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Post.objects.filter(author=user)
    

# our new API end point to save whether the user has liked something or not
class ToggleLike(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, post_id):
        post = Post.objects.get(id=post_id)
        user = request.user

        # this is basically saying find an existing like object with these parameters if not create a new obj
        like, created = Like.objects.get_or_create(user=user, post=post)

        if not created:
            like.delete()
            return Response({'liked': False, 'like_count': post.likes.count()})
        else:
            return Response({'liked': True, 'like_count': post.likes.count()})
    
