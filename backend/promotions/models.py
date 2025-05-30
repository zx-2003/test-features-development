from django.db import models

# Create your models here.
class FoodPromotion(models.Model):
    telegram_message_id = models.CharField(max_length=255, unique=True)

    restaurant_name = models.CharField(max_length=255)
    deal_type = models.CharField(max_length=255)
    active_dates = models.JSONField(default=list)
    location = models.CharField(max_length=255) #might need to change this to fit location finder
    image = models.ImageField(upload_to='telefoodpromo_photos/', null=True, blank=True) #specify imgpath later
    
    full_message_text = models.TextField(null=True, blank=True) #for reference
    created_at = models.DateTimeField(auto_now_add=True)
    more_info_url = models.URLField(blank=True, null=True)

    def __str__(self):
        return f"{self.restaurant_name} - {self.deal_type}"
