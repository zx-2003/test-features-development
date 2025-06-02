from django.core.management.base import BaseCommand
from django.core.files import File
import os
import asyncio
from dotenv import load_dotenv 
from django.conf import settings

from asgiref.sync import sync_to_async
from pathlib import Path

from telethon import TelegramClient, events
from promotions.models import FoodPromotion
from promotions.utils import parse_telepromo

load_dotenv() 

api_id = int(os.getenv("TELEGRAM_API_ID")) #gets from .env
api_hash = os.getenv("TELEGRAM_API_HASH")
channel = os.getenv("TELEGRAM_CHANNEL")

client = TelegramClient("telegram_session", api_id, api_hash)
BASE_DIR = Path(settings.BASE_DIR) #check where BASE_DIR is routing to now

@client.on(events.NewMessage(chats=channel)) #wait for newmessage to come in
async def handle_message(event):
    message = event.message
    if not message.text:
        return
    
    parsed_message = parse_telepromo(message.text)
    
    django_file = None
    image_temp_path = None

    if message.photo:
        
        image_temp_path = Path(await message.download_media()).resolve() #download media as a regular file on disk
        
        with open(image_temp_path, 'rb') as f: #rewrap the file with as a Django file instead, to save to ImageField model
            django_file = File(f)
            django_file.name = f"{message.id}.jpg"


            await sync_to_async(FoodPromotion.objects.get_or_create)( #only create if doesnt already exist (should have no issue since teleid is unique per message)
                telegram_message_id=message.id,
                defaults={
                    **parsed_message,
                    'image': django_file,
                    'full_message_text': message.text
                }
            )

        if image_temp_path and image_temp_path.exists(): #clean up image temp path (the regular file at root)
            image_temp_path.unlink()

class Command(BaseCommand):
    help = 'Listen for TelePromos and Store'

    def handle(self, *args, **options):
        async def start_telegram():
            await client.start()
            await client.run_until_disconnected()
        
        asyncio.run(start_telegram()) #need actual web server to run outside of development