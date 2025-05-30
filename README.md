Instructions to test:
- download repo
- (Compulsory) setup own mySQLDB and configure backend > config > DATABASES with own database information
- (Optional) get telegramAPI to test promotion listener
- (Optional) get Maps JavaScript API, Places API (new) to test food finder
- (Compulsory) set up .env as with .env.example in your root directory, replace necessary API keys and Hash.

Backend Startup:
  - Open terminal
  - python -m venv .venv
  - Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process
  - .venv\Scripts\Activate.ps1
  - cd backend
  - .venv\Scripts\Activate.ps1
  - pip install -r requirements.txt
  - python.exe -m pip install --upgrade pip //if needed
  - python manage.py makemigrations
  - python manage.py migrate
  - python manage.py runserver

Frontend Startup:
  - Open new terminal
  - Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process
  - .venv\Scripts\Activate.ps1
  - cd frontend
  - npm install

(Optional) Telethon Promotions Listener:
  - Open new terminal
  - Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process
  - .venv\Scripts\Activate.ps1
  - cd backend
  - python manage.py listen_telegram 
  - Enter in your telegram user and 2fa code
  - Send prompts into a temporary telegram channel, formatted as per .env.example's telegram channel

User Experience:
  - Login:

  - Registration:

  - Home Page:

  - Explore Page:

  - Profile Page:

  - Promotions Page:

  - Food Finder Page:

  
