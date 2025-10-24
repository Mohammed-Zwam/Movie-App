# Movie-App (ITI)

Simple project built as a complete project for ITI summer training.

This repository contains two parts:

- `server/` — Express.js API (MongoDB-backed).
- `client/` — Angular frontend application.

## How to run

Open PowerShell and run these steps.

1. Run the server

```powershell
cd .\server
npm install
# Create a .env file with DB_CONNECTION_STRING
# Important: 
# SECRET_KEY=1e5082d4e959f093eb94f6026d4eff143db29f84290206786494b67d35e2d6f7
# DB_CONNECTION_STRING=mongodb+srv://MO-ZWAM:ITI_Movie_App@movie-app-dbs.wgp2djt.mongodb.net/Movie-App-Collections?retryWrites=true&w=majority&appName=Movie-App-DBs

node .\app.js
```

By default the API docs page is served at:

- http://localhost:3000/  (shows a API Doc page)

2. Run the client

```powershell
cd ..\client
npm install
# If you have the Angular CLI globally installed you can run:
# ng serve --open
# or use npm start if defined in package.json:
npm start
```

The Angular app usually runs at `http://localhost:4200`.

## Notes

- Make sure MongoDB is running and the connection string in `.env` is correct.
- Authentication uses cookies; endpoints that require auth are described on the API docs page.


## Below are demo screenshots

![demo](./assets/1.jpeg)
![demo](./assets/2.jpeg)
![demo](./assets/3.jpeg)
![demo](./assets/4.png)
![demo](./assets/5.png)
![demo](./assets/6.png)
![demo](./assets/7.png)
![demo](./assets/8.png)
![demo](./assets/09.png)
![demo](./assets/10.png)
![demo](./assets/11.jpeg)
![demo](./assets/12.jpeg)
![demo](./assets/13.png)
![demo](./assets/14.png)
![demo](./assets/15.jpeg)
![demo](./assets/16.png)
![demo](./assets/17.png)