#from django.shortcuts import render
from promotions.models import FoodPromotion
from rest_framework import generics
from .serializers import FoodPromotionSerializer
#from rest_framework.permissions import IsAuthenticated, AllowAny

# Create your views here.
class FoodPromotionList(generics.CreateAPIView): 
    queryset = FoodPromotion.objects.all().order_by('-created_at')
    serializer_class = FoodPromotionSerializer
    #permission_classes = [AllowAny]