# Team DECOmpile - Growcery (Backend)
## E-commerce website for connecting both farmers and customers

Build using Express framework for Node.js.
API documentation can be accessed on: https://www.postman.com/dark-crescent-451847/workspace/team-decompile-growcery-backend-api/overview

## Project Structure
- Config: Contains configuration files for database and passport package (for Google authentication).
- Controllers: Contains controllers for each model.
- Middlewares: Contains middlewares for routes.
- Models: Contains schema definition for models.
- Routes: Contains routes for API.

## Run in Your Local Computer
Install dependencies
```sh
npm install
```
Run the project
```sh
node index.js
```

## Run in UQZone
Change directory to /var/www/nodejs
```sh
cd /var/www/nodejs
```

Install dependencies
```sh
npm install --prefix /var/www/nodejs
```

Run the project
- Using Nodemon (recommended)
```sh
nohup nodemon --exitcrash /var/www/nodejs/index.js </dev/null &
```
- Using Node
```sh
nohup node index.js &
```