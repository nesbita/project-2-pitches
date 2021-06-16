# Project 2 Pitch Guidelines
Project Description and Pitch Guidelines for SEIR SEA P2

---
## Project 2 Goals

In your second project you will create a full stack Express and Postgres app which has:
- *At least x2 models, and utilize and build at least one relationship between the two models.*
- *Sequelize as an ORM to interact with and create your database.*
- *An Express server utilizing EJS/EJS layouts for UI design and styling.*
- *Interaction with and inclusion of at least one API.*

## Project 2 Pitch Guidelines

In designing and building your project, you will start by forking and cloneing this repository, and then editing this README to include the following information: 
1. App name: 
Market Finder

2. Technologies used: 
Axios, Express, PostgresSQL, Sequelize, Express-ejs, Express-ejs-layouts,  HTML, CSS, Javascript, method override

3. Simple wireframes
     * Can be handdrawn, or with tool of your choice
     * Example online tool: [Miro.com](https://miro.com/)
     file:///Users/ariananesbit/Desktop/general-assembly/unit-2/P2/P2%20Wireframe.html

5. API name
 USDA National Farmer's Market Directory API

6. Example of how to call/invoke your API, and a description of what data comes back. 
Fill in the zip code value where it's called for ("http://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip=" + zip,) and receive nearby farmers markets' names and ids.  Ids can then be used to find the market address, schedule, and products, as well as a link to Google Maps when added to another url (url: "http://search.ams.usda.gov/farmersmarkets/v1/data.svc/mktDetail?id=" + id,).

7. MVP goals (x3-5)
-Create a GET route to find markets by zip code 
-Create a GET route to view products at markets
-Create a POST route to add markets to favorites
-Create a PUT route to allow users to update location
-Create a DELETE route to remove favorite markets

8. Stretch goals (x2-5)
-use geolocation API and mapbox to show user's distance from farmers markets
-include mapping visuals
-save zip code

9. Any potential roadblocks?
-What is everything linked to?

## How to get started
1. **Fork and clone this repository.**
2. **Edit the text above to include specifics of your project.**
3. **Commit, push, and submit a pull request to this repo with your edited pitch README.**
4. *After you have met with a staff member and your pitch has been approved, suggested next steps:*
      * Write out your routes and create a RESTful routing chart (good example [here](https://gk-hynes.github.io/restful-routes-chart/)).
      * Come up with a breakdown of what you plan to accomplish each day and how you are going to accomplish it.
      * Create a new git repo for your project. 
      * Make all test API calls you need to to ensure your API will be usable for this project. 
      




