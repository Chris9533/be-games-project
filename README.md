# be-games-project


## Intro

This is my backend API which has the purpose of accessing application data and provide this information to future front end architecture. The database with our stored information is PSQL and this API interacts with the database using node-postgres.

## Link to hosted Version

https://mysterious-dusk-03964.herokuapp.com/

## Setup


### Cloning

- To run this API locally first you will need to clone this repository.

In your CLI run the command :

 gh repo clone Chris9533/be-games-project

 ### Install Dependencies 

 - Next you will need install the relevant dependencies for this API

 In the root of your cloned repository run the command :

 npm install

 - For a list of the dependencies being used check the package.json file

 ### Create .env files

Two files will need to be created in order for psql to be able to connect to the correct databases, these files should be located in the root of your repository.

- Create a file called .env.test and inside this file there should be PGDATABASE=nc_games_test
- Create a file called .env.development and inside this file there should be PGDATABASE=nc_games

 ### Seed the Database

 After this you will need to create your databases and seed them with data.

 -To create your databases run the command:

 npm run setup-dbs

 -After this to seed your databases run the command:

 npm run seed

 ## Using the API


 ### Run tests

 -To run the test suite use the command:

 npm test

 This will run all the tests in the __tests__ folder. You can specify which test file you would like to run by specifying the path.

 E.g- npm test ./__tests__/utils.test.js


 ## External application requests

 You can make also make requests to this API using applications like insomnia.

 -First you will need to make the API listen for requests by running the command:

 npm run start

 -Now you can make requests using insomnia and the correct port key which is set to 9090:

 E.g: localhost9090:/api/reviews


 ## Endpoints

 You can view all available endpoints for this API by making a request to /api:

 E.g: localhost9090:/api

 ## Minimum versions of software required

 - Minimum version of node required is v17.8.0

 - Minimum version of psql required is v12.10





