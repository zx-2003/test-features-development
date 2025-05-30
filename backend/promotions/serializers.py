from rest_framework import serializers
from .models import FoodPromotion

class FoodPromotionSerializer(serializers.ModelSerializer):
    #image = serializers.ImageField(use_url=True)
    
    class Meta:
        model = FoodPromotion
        fields = '__all__'
        
