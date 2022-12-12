// Setup empty JS object to act as endpoint for all routes
projectData = {};
// Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();
/* Dependencies */
const cors = require("cors");
const bodyParser = require("body-parser");
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static("website"));
//port for server
const Port = 4000;
// Setup Server
const server = app.listen(Port, () => {
    console.log(`Server is running on http://localhost:${Port}`)
})


// Callback function to complete GET '/all'
app.get('/all', (request, response) => { // Initialize all route with a callback function
    response.send(projectData).status(200).end()  //Http status code 200 means success 
})

// Post Route
app.post('/postData', (request, response) => {
    projectData = {
        temp: request.body.temp,
        content: request.body.content,
        date: request.body.date,
    };
    response.send(projectData).status(200).end()
})
