// Setup empty JS object to act as endpoint for all routes
require("dotenv").config();
const performance = require('perf_hooks').performance;
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const compression = require('compression');
const cors = require("cors");

const axios = require('axios');
const moment = require('moment')();
const app = express();

const port = process.env.BACKEND_PORT || 3000;
const apiKey = process.env.WEATHER_API_KEY || '';
const weatherBaseUrl = process.env.WEATHER_BASE_URL || '';
// Require Express to run server and routes

// Start up an instance of app

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(helmet());
app.use(cors());
app.use(compression());

// Cors for cross origin allowance

// Initialize the main progject folder
app.use(express.static('website'));

app.disable('x-powered-by');

// Setup Server

function ProjectData() {
    this.content = "";
    this.date = moment.format("MM.DD.YYYY");
    this.temp = "";
    this.weather = {};
    this.setWeather = function (json) {
        this.weather = json;
        return this;
    };
    this.setTemp = function (temp) {
        this.temp = temp.toString();
        return this;
    };
    this.refreshDate = function () {
        this.date = moment.format("MM.DD.YYYY HH:mm");
    };
}

function generateWeatherURL(q) {
    return `${weatherBaseUrl}/weather?${q}&appid=${apiKey}`
}

async function getData(url) {
    return await axios.get(url)
        .then(response => {
            if (response.status === 200) {
                return response.data;
            } else {
                console.error(response.status);
                return Promise.reject(response.status)
            }
        })
        .catch(error => {
            console.error(error);
            return Promise.reject(error)
        });

}

app.post("/get-current-weather-data", async (req, res) => {
    console.log(req);
    const zipcode = req.body.zipcode;
    if (zipcode) {
        const wUrl = generateWeatherURL(`zip=${zipcode}`);
        const jsonData = await getData(wUrl).catch((e) => {
            console.error(e);
            res.status(500).end();
        });

        console.log(jsonData);
        const webData = new ProjectData();


        webData.setWeather(jsonData);
        webData.setTemp(jsonData.main.temp);
        webData.refreshDate();
        res.status(200).send(JSON.stringify(webData))
    } else {
        res.status(500).send();
    }
});

app.listen(port);
console.log("Server started on port " + port);

