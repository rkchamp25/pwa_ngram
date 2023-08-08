# Progressive Web App to Display NGRAMS

Backend - ExpressJS    
Frontend - React  
Server - Django  
Database - MongoDB  


## INSTALLATON  

This has been tested on Ubuntu20.04LTS  
Install mongodb and start service  
`sudo apt install mongodb`  
`sudo systemctl start mongodb`  
`sudo systemctl enable mongodb`  

use nvm(node-version-manager) to install nodejs  
to install nvm -> [https://github.com/nvm-sh/nvm]  

`nvm install 16.19.1`     
`cd frontend` and `npm install`  
`cd backend` and `npm install`  
`conda create -n env python=3.10`  
`cd server` and `pip install -r requirements.txt`  


## TO RUN  

check if mongodb is running or not, if yes, then this command will exit out, else leave it running  
`mongod`  
start django server  
`cd server` and `python manage.py runserver`  
start backend  
`cd backend` and `npm start`  
start frontend  
`cd frontend` and `npm start`  

go to http://localhost:3000


## DOCKER  

Run the following from project root  
`docker compose up`  

go to http://localhost:3000


### Checklist  
- [x] 1. Create a backend using ExpressJS.  
- [x] 2. Create a PWA using React that that accepts text input and sends it to the backend. Bonus : UI changes on interaction  
- [x] 3. The backend should have the following 3 functionalities -  
  - [x] a. log the number of times a connection is made by the frontend and insert it into a Mongoose Model  
  - [x] b. receive the text that was inserted from the frontend and insert it in another Model  
  - [x] c. calls the Django api using the most recent 2 strings and returns the ngrams to the frontend  
- [x] 4. Create a Django server that has an API that returns the ngrams comparison using NLTK.  
- []  5. Create a new repo on GitHub   
  - [x] a. which has all the commits  
  - []  b. independent branches for the 3 pipelines that are merged for submission. Make sure that there are merge conflicts that you can resolve and show you skills.
- [x] 6. Bonus : Containerise each of the components (Node frontend, Node backend, Django Backend) on independent docker containers
