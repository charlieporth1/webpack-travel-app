// Setup empty JS object to act as endpoint for all routes
require('dotenv').config();
const {BACKEND_PORT = 3000, GEO_USERNAME = ''} = process.env;
const performance = require('perf_hooks').performance;
const {ProjectData} = require('./DataType');
const {getData, getPlaceZipCode, getWeather} = require('./getData');
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const compression = require('compression');
const cors = require("cors");



const app = express();
// Require Express to run server and routes

// Start up an instance of app
const corsOptions = {
    origin: "http://localhost:8080/",
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(helmet());
// app.use(cors(corsOptions));
app.use(cors());
app.use(express.static('dist'));
app.use(compression());

// Cors for cross origin allowance

// Initialize the main progject folder
app.use(express.static('client'));

app.disable('x-powered-by');

// Setup Server

app.post("/get-data", async (req, res) => {
    const zipcode = req.body.zipcode;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    if (req.body && zipcode) {
        const placeResponse = await getPlaceZipCode(zipcode).catch((e) => {
            console.error(e);
            res.status(500).end();
        });
        console.log(placeResponse);

        const weatherResponse = await getWeather(zipcode).catch((e) => {
            console.error(e);
            res.status(500).end();
        });
        console.log(weatherResponse);
        const webData = new ProjectData({startDate, endDate}, weatherResponse, placeResponse);
        webData.refreshDate();
        res.status(200).send(JSON.stringify(webData))
    } else {
        res.status(500).send('Error no zipcode');
    }
});

app.listen(BACKEND_PORT);
console.log("Server started on port " + BACKEND_PORT);

