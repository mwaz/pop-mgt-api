[![Coverage Status](https://coveralls.io/repos/github/mwaz/pop-mgt-api/badge.svg?branch=master)](https://coveralls.io/github/mwaz/pop-mgt-api?branch=master)

## Population Management API

A CRUD API app built on node, express, and mongodb.


The Express JS framework handles the API CRUD, mongodb handles the DB storage while Moongoose is used as an Object Document Mapper (similar to an ORM in python). 

## Requirements

* NodeJS
* Mongo DB
* express framework
* Moongoose 

## What the app does

The API enables a user to store a list of locations and the total number of residents in each location broken down by gender.
Locations can be nested within each other.

## Application setup 

SMS management API is hosted on heroku and you can access the [documentation here](https://pop-mgt-api.herokuapp.com/api-docs). Through the docs you can test out the endpoints and the functionnality of the API.

## Running the application locally 
1. clone the application from `git@github.com:mwaz/pop-mgt-api.git`
2. Install dependencies using `npm ci` or `npm install`
3. Start the application `npm start`

## Running the test locally
1. clone the application from `git@github.com:mwaz/pop-mgt-api.git`
2. Install dependencies using `npm ci` or `npm install`
3. run the tests using `npm test`

## Technologies
Technologies used in the application are Express, Node and MongoDB. In the next iteration, ReactJS will be used as the frontend with Google Cloud Platfrom working as the engine that will power the application. 

## Documentation 
The app is currently documented using swagger 2.0 and the Open API Specification as shown below . 

![Screen Shot 2019-03-15 at 08 34 45](https://user-images.githubusercontent.com/10160787/54410615-3e747300-46fd-11e9-9d6d-f7831e878ed8.png)


## contributors
[@mwaz](https://github.com/mwaz)


