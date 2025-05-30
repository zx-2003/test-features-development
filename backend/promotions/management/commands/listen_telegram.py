from django.core.management.base import BaseCommand
import os
import asyncio
from dotenv import load_dotenv 
from django.conf import settings

import shutil
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

#helper function to save media files

def save_image_to_media(message_id, image_temp_path): #fix
    
    media_root = BASE_DIR / 'media' / 'telefoodpromos_photos' 
   
    #make sure dir exist
    media_root.mkdir(parents=True, exist_ok=True)

    image_path = media_root / f"{message_id}.jpg"
   
    shutil.copy(image_temp_path, image_path)
    return str(image_path.relative_to(BASE_DIR)) #need to resolve additional images populated at backend

@client.on(events.NewMessage(chats=channel)) #wait for newmessage to come in
async def handle_message(event):
    message = event.message
    if not message.text:
        return
    
    parsed_message = parse_telepromo(message.text)
    '''
    if not all(parsed.values()):
        handle logic for messages with missing data?
    '''

    image_path = None
    if message.photo:
        
        image_temp_path = await message.download_media()
        image_path = save_image_to_media(message.id, image_temp_path) #use unique teleid as path


    await sync_to_async(FoodPromotion.objects.get_or_create)( #only create if doesnt already exist (should have no issue since teleid is unique per message)
        telegram_message_id=message.id,
        defaults={
            **parsed_message,
            'image': image_path,
            'full_message_text': message.text
        }
    )

class Command(BaseCommand):
    help = 'Listen for TelePromos and Store'

    def handle(self, *args, **options):
        async def start_telegram():
            await client.start()
            await client.run_until_disconnected()
        
        asyncio.run(start_telegram()) #need actual web server to run outside of development