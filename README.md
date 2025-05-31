Instructions to test:
- Download the repository
- (Compulsory) Setup own mySQLDB and configure backend > config > DATABASES with own database information
- (Compulsory) Set up .env as with .env.example in your root directory, replace necessary API keys and Hash.
- (Compulsory) Get the demoMap Key from Google @ https://developers.google.com/maps/documentation/javascript/place-search#maps_place_text_search-html
  or (Optional) use your own Maps JavaScript API, Places API (new) to test food finder @ https://console.cloud.google.com/
- (Optional) Get telegramAPI to test promotion listener, signup @ https://my.telegram.org/auth


Backend Startup:
  - Open terminal
  - `python -m venv .venv` create virtual environment
  - `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process`
  - `.venv\Scripts\Activate.ps1`
  - `cd backend`
  - `pip install -r requirements.txt` install all packages
  - `python.exe -m pip install --upgrade pip` if prompted to
  - `python manage.py makemigrations`
  - `python manage.py migrate`
  - `python manage.py runserver`

Frontend Startup:
  - Open new terminal
  - `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process` make sure .venv is created first
  - `.venv\Scripts\Activate.ps1`
  - `cd frontend`
  - `npm install` install all packages
  - navigate to NomNomsSavr > frontend > index.html and replace the Google Maps API Key in script src @ [yourkeygoeshere]
  - `npm run dev`

(Optional) Telethon Promotions Listener:
  - Open new terminal
  - `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process`
  - `.venv\Scripts\Activate.ps1`
  - `cd backend`
  - `python manage.py listen_telegram `
  - Enter in your telegram user and 2fa code
  - Send prompts into a temporary telegram channel, formatted as per .env.example's telegram channel. Message format taken from @ https://t.me/kiasufoodies

User Experience:
  - Login:

  - Registration:

  - Home Page:

  - Explore Page:

  - Profile Page:

  - Promotions Page:

  - Food Finder Page:

  
