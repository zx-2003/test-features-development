from django.urls import path
from . import views

urlpatterns = [
    path("posts/", views.PostListCreate.as_view(), name="post-list"),
    path("explore_posts/", views.PostListCreateExplore.as_view(), name = "post-list-explore"),
    path("posts/delete/<int:pk>/", views.PostDelete.as_view(), name="delete-post"),
    path("userPublicPosts/<int:user_id>/", views.PublicPostListCreate.as_view(), name="public-posts"),
]