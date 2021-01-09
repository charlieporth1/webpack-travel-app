const {generateGeoZipUrl, generatePictureRequestUrl, generateWeatherURL} = require('./utils');
const axios = require('axios');

async function getWeather(zipcode) {
    const wUrl = generateWeatherURL(`zip=${zipcode}`);
    return getData(wUrl).then(getLocation => Promise.resolve(getLocation)
    ).catch((e) => {
        console.error(e);
        return Promise.reject(e);
    });
}

async function getPlaceZipCode(zipcode) {
    const url = generateGeoZipUrl(zipcode);
    return getData(url).then((locationResponse) => Promise.resolve(locationResponse)).catch((e) => {
        console.error(e);
        return Promise.reject(e);
    })
}

async function getData(url) {
    return axios.get(url)
        .then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.data);
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

module.exports = {getData, getPlaceZipCode, getWeather};