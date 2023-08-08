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