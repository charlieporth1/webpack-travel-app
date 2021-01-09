// Setup empty JS object to act as endpoint for all routes
require('dotenv').config();
const {BACKEND_PORT = 3000, GEO_USERNAME = ''} = process.env;
const performance = require('perf_hooks').performance;
// const {} = require('./utils');
const {getData, getPlaceZipCode, getWeather} = require('./getData');
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const compression = require('compression');
const cors = require("cors");


const moment = require('moment')();
const Geonames = require('geonames.js'); /* commonJS */
const app = express();
// Require Express to run server and routes

// Start up an instance of app
const corsOptions = {
    origin: "http://localhost:8080",
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(helmet());
app.use(cors(corsOptions));
app.use(compression());

const geonames = Geonames({
    username: GEO_USERNAME,
    lan: 'en',
    encoding: 'JSON'
});

// Cors for cross origin allowance

// Initialize the main progject folder
app.use(express.static('client'));

app.disable('x-powered-by');

// Setup Server

function ProjectData() {
    this.content = "";
    this.date = moment.format("MM.DD.YYYY");
    this.startDate = '';
    this.endDate = '';

    this.weather = function () {
        //Gets
        this.name = 'Minneapolis';
        this.coord = function () {
            this.lon = '';
            this.lat = '';
        };
        this.status = function () {
            this.main = 'Haze';
            this.description = 'haze';
            this.icon = '50d';
        };

        this.main = function () {
            this.temp = '';
            this.humidity = '';
            this.feelsLike = '';
            this.tempMin = '';
            this.tempMax = '';
            this.pressure = '';
        };
        this.wind = function () {
            this.speed = '';
            this.deg = '';
        };
        this.sys = function () {
            this.sunrise = '1610113830,';
            this.sunset = '1610146186';
        };
        //Sets 
        this.setSys = function (data) {
            this.sys.sunrise = data.sunrise;
            this.sys.sunset = data.sunset;
        };
        this.setWind = function (data) {
            this.wind.speed = data.speed;
            this.wind.deg = data.deg;
        };
        this.setStatus = function (data) {
            this.status.main = data.main;
            this.status.description = data.description;
            this.status.icon = data.icon;
        };
        this.setMain = function (data) {
            this.main.temp = data.temp;
            this.main.humidity = data.humidity;
            this.main.feelsLike = data.feelsLike;
            this.main.tempMin = data.tempMin;
            this.main.tempMax = data.tempMax;
            this.main.pressure = data.pressure;
        };
        this.setCoord = function (data) {
            this.coord.lon = data.lon;
            this.coord.lat = data.lat;
        };
        this.populate = function (data) {
            if (data.sys) {
                this.setSys(data.sys);
            }
            if (data.weather) {
                this.setStatus(data.weather);
            }
            if (data.wind) {
                this.setWind(data.wind);
            }
            if (data.main) {
                this.setMain(data.main);
            }
            if (data.coord) {
                this.setCoord(data.coord);
            }
        };
    };



    this.location = function () {
        this.reigon = '';
        this.local = '';
        this.city = '';
        this.country = '';
        this.postalCode = '';
        this.reigonAb = '';
        this.lat = '';
        this.lon = '';
        this.populate = function (data) {
            const json = data.postalcodes[0];
            this.location.reigon = json.adminName1;
            this.location.reigonAb = json.adminCode1;
            this.location.city = json.placeName;
            this.location.postalCode = json.postalcode;
            this.location.local = json.adminName2;
            this.location.country = json.countryCode;
            this.location.lon = json.lng;
            this.location.lat = json.lat;
        };
    };

    this.populateOther = function (data) {
        this.startDate = data.startDate;
        this.endDate = data.endDate;
    };
    this.refreshDate = function () {
        this.date = moment.format("MM.DD.YYYY HH:mm");
    };
}


app.post("/get-data", async (req, res) => {
    const zipcode = req.body.zipcode;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    if (req.body) {
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
        const webData =  new ProjectData();

        webData.weather().populate(weatherResponse);
        webData.location().populate(placeResponse);
        webData.populateOther({startDate, endDate});
        webData.refreshDate();
        res.status(200).send(JSON.stringify(webData))
    } else {
        res.status(500).send();
    }
});

app.listen(BACKEND_PORT);
console.log("Server started on port " + BACKEND_PORT);

