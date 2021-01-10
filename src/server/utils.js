require('dotenv').config();
const {WEATHER_API_KEY = '', WEATHER_BASE_URL = 'https://api.openweathermap.org', PIC_API_KEY = '', GEO_USERNAME = ''} = process.env;

const PIC_URL_ROOT = 'https://pixabay.com/api';
const BASE_GEO_URL = 'http://api.geonames.org';

const generatePictureRequestUrl = (query) => {
    return `${PIC_URL_ROOT}/?key=${PIC_API_KEY}&q=${query}`;
};

const generateWeatherURL = (q) => {
    return `${WEATHER_BASE_URL}/data/2.5/weather?${q}&appid=${WEATHER_API_KEY}`;
};

const generateGeoZipUrl = (zipcode, country = 'USA') => {
    return `${BASE_GEO_URL}/postalCodeLookupJSON?postalcode=${zipcode}&country=${country}&username=${GEO_USERNAME}`;
};


module.exports = {generateWeatherURL, generatePictureRequestUrl, generateGeoZipUrl};