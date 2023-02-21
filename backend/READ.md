# Setup Backend & Frontend project
## Set up Database

- Connect Default postgres username `psql -U postgres`
- In psql command view,  Create Dev & test database 
    - `CREATE DATABASE storetest;`
    - `CREATE DATABASE storelive;`
- In project command biew,
    - `cd backend` change Directory to backend 
    - `db-migrate up` setup User & Order Table 

## Set up env (Backend)
- add a `.env` file in the root directory 
```
POSTGRES_HOST=127.0.0.1
POSTGRES_DB=storelive
POSTGRES_DB_TEST=storetest
POSTGRES_USER=postgres
POSTGRES_PASSWORD="Enter password"
POSTGRES_PORT=5432
PORT=4000
NODE_ENV=dev
BCRYPT_PASSWORD=rin-flashh-run
SALT_ROUNDS=10
TOKEN_SECRET=token-secret
```

## Set up Backend project
- `npm install` to install all dependencies
- `npm run build` to build the app

## Set up Frontend project 
- `cd ../backend`Change Directory to frontend
- `npm install` to install all dependencies
- `npm run build` to build the app
## Start the app
- `npm run dev` to start the app and get access via http://localhost:4000

## Ports
-  Database runs on port 5432
-  Backends runs on port 4000
-  Frontend runs on port 3000
 