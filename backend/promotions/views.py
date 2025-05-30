#from django.shortcuts import render
from promotions.models import FoodPromotion
from rest_framework import generics
from .serializers import FoodPromotionSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny

# Create your views here.
class FoodPromotionList(generics.ListAPIView): 
    queryset = FoodPromotion.objects.all().order_by('-created_at') #add filter for dates eventually
    serializer_class = FoodPromotionSerializer
    permission_classes = [AllowAny]