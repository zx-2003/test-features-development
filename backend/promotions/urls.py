#from django.contrib import admin
from django.urls import path
from .views import FoodPromotionList

#link later for display
urlpatterns = [
    path('', FoodPromotionList.as_view(), name='food-promotion-list')
]