#sudo apt-get install python3-venv
python3 -m venv myvenv
source myvenv/bin/activate
pip install -r requirements.txt
cd contacts
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
