// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();


/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server

const port = 8000;

const server = app.listen(port, listening);
function listening() {
    console.log(`running on localhost: ${port}`);
};


// get function that gets that sends project data
app.get('/all', getData);
function getData(request, response) {
    response.send(projectData);
    console.log(projectData);
};


app.post('/add', addData)

function addData(request, response) {

let data = request.body;

console.log('server side data ', data)

projectData["date"] = data.date;
projectData["temp"] = data.temp;
projectData["content"] = data.content;

response.send(projectData);
}

