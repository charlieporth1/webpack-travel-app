/* Global Variables */

// Create a new date instance dynamically with JS


import {toggleLoader} from "./toggle_loading";
import {getInputValue, kelvinToF} from "./utils";
import {generateHTML} from "./result_handler";

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

// 'Access-Control-Allow-Methods': 'POST',
//     'Access-Control-Allow-Origin': SERVER,
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
    data = {
        zipcode: data.zipcode,
        startDate: data.startDate,
        endDate: data.endDate
    };
    return await new Promise(resolve => {
        fetch(`${SERVER}/get-data`, {
            method: 'POST',
            body: JSON.stringify(data),
            ...defaultFetchOpts()
        }).then(async res => await res.json())
            .then((json) => {
                // The API call was successful!
                console.log(json);
                return resolve(json);
            })
    })
    // .catch((err) => {
    // console.error("Promise error ", err);
    // return Promise.reject(err)
    // })

    // .catch((err) => {
    // There was an error
    // console.warn('Something went wrong.', err);
    // return Promise.reject(err);
    // });
}

function modifyDom(data) {
    const dateDiv = document.getElementById("date");
    const tempDiv = document.getElementById("temp");

    dateDiv.innerHTML = data.date + " last updated";
    tempDiv.innerText = kelvinToF(parseFloat(data.weather.main.temp)).toFixed(1) + "°F";
    document.getElementById('results').innerHTML = generateHTML(data);
    toggleLoader();

}


export {createWeatherClick, modifyDom, getData, onSubmit, defaultFetchOpts}