from django.urls import path
from .views import UserProfileView, UpdateUserView, ChangePasswordView, FollowUserView, UnfollowUserView, PublicProfileView

urlpatterns = [
    path('profile/', UserProfileView.as_view(), name='user-profile'),
    path('update/', UpdateUserView.as_view(), name='user-update'),
    path('change-password/', ChangePasswordView.as_view(), name='change-password'),

    path('follow/<int:user_id>/', FollowUserView.as_view(), name='follow-user'),
    path('unfollow/<int:user_id>/', UnfollowUserView.as_view(), name='unfollow-user'),
    path('publicProfile/<int:user_id>/', PublicProfileView.as_view(), name='public-profile'),
]
