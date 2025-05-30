instructions

python -m venv .venv
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process
.venv\Scripts\Activate.ps1
cd backend
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python.exe -m pip install --upgrade pip //if needed
python manage.py makemigrations
python manage.py migrate
python manage.py runserver

Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process
.venv\Scripts\Activate.ps1
cd frontend
npm install

Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process
.venv\Scripts\Activate.ps1
cd backend
python manage.py listen_telegram