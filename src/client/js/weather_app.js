/* Global Variables */

// Create a new date instance dynamically with JS


import {toggleLoader} from "./toggle_loading";
import {getInputValue, kelvinToF} from "./utils";

const SERVER = 'http://localhost:3000';

function defaultFetchOpts() {
    return {
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': SERVER,
        },
    }
}

function createWeatherClick() {
    const button = document.body.querySelector('#generate');
    button.addEventListener("click", async () => {
        await onSubmit();
    })
}

async function onSubmit() {
    const place = getInputValue("zip");
    const startDate = getInputValue("travel-start-date");
    const endDate = getInputValue("travel-end-date");
    const data = {
        zipcode: place,
        startDate: startDate,
        endDate: endDate
    };
    const jsonData = await getData(data);
    modifyDom(jsonData)
}

async function getData(data) {
    return fetch(`${SERVER}/get-data`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            ...defaultFetchOpts()
        }
    }).then((response) => {
        // The API call was successful!
        if (response.ok && response.status === 200) {
            console.log(response);
            return Promise.resolve(response.json());
        } else {
            return Promise.reject(response);
        }
    }).catch((err) => {
        // There was an error
        console.warn('Something went wrong.', err);
        return Promise.reject(err);
    });
}

function modifyDom(data) {
    const dateDiv = document.getElementById("date");
    const tempDiv = document.getElementById("temp");
    const contentDiv = document.getElementById("content");
    const feelings = getInputValue("feelings");

    dateDiv.innerHTML = data.date + " last updated";
    tempDiv.innerText = kelvinToF(parseFloat(data.temp)).toFixed(1) + "°F";
    contentDiv.innerHTML = feelings;

    toggleLoader();

}


export {createWeatherClick, modifyDom, getData, onSubmit, defaultFetchOpts}