## How to run backend Mac

1. ```pip install virtualenv```(globally)
2. cd to /backend folder locally, create a folder ```mkdir djangoenv```and build your virtual environment ```virtualenv djangoenv -p python3```
3. activate virtual environment, ```source djangoenv/scripts/activate``` 
4. ```cd CSW``` to the folder CSW firstly and then install all the package in requirements.txt, this should be installed locally in your folder but not global python environment ```pip install -r requirements.txt``` 
if you can't install requirements.txt then you should update pip first ```pip install --upgrade pip``` 
5. **important** if you want to install a new module, ```pip install yourmodule```, and update requirements.txt file manually, don't ```pip freeze```
6. For running the server use comment ```python manage.py runserver```


## How to run backend Windows

1. ```pip install virtualenv```(globally)
2. cd to /backend folder locally, build your virtual environment ```python -m virtualenv .```
3. activate virtual environment, ```scripts/activate``` (windows)
4. ```cd CSW``` to the folder CSW firstly and then install all the package in requirements.txt, this should be installed locally in your folder but not global python environment ```pip install -r requirements.txt```
5. **important** if you want to install a new module, ```pip install yourmodule```, and ```pip freeze > requirements.txt``` to update requirements.txt file
6. For running the server use comment ```python manage.py runserver```
