import {kelvinToF} from "./utils";

function expandableById(elementId) {
    const dataElement = document.getElementById(elementId.toString());
    const isHidden = dataElement.style.display.toString().includes("none");
    const toggleStr = !isHidden ? "none" : "block"; //custom code loaded from utils // this is a if else technical
    dataElement.style.display = toggleStr;
}

function clickToCopyAction(elementId) {
    try {
        /* Get the text field */
        let copyText = document.getElementById(elementId);

        /* Select the text field */
        copyText.select();
        copyText.setSelectionRange(0, 99999); /* For mobile devices */

        /* Copy the text inside the text field */
        document.execCommand("copy");

        /* Alert the copied text */
        return copyText;
    } catch {
        return "Copied";
    }
}


function generateHTML(json) {
    return `
        <table>
         <tr>
         <th>Data</th>
         <th>Result</th>
  
          </tr>
       
           <tr>
        <td>City</td>
        <td>${json.location.city}</td>
        </tr>
        <tr>
        <td>Region</td>
        <td>${json.location.reigon}</td>
        </tr>
        <tr>
        <td>Country</td>
        <td>${json.location.country}</td>
        </tr>
        <tr>
        <td>Temp</td>
        <td>${kelvinToF(json.weather.main.temp)}</td>
        </tr>
         <tr>
        <td>Feels Like</td>
        <td>${kelvinToF(json.weather.main.feelsLike)}</td>
        </tr>
        <tr>
        <td>Humidity</td>
        <td>${json.weather.main.humidity}</td>
        </tr>
         <tr>
        <td>Skys</td>
        <td>${json.weather.status.main}</td>
        </tr>
         <tr>
        <td>Skys Description</td>
        <td>${json.weather.status.description}</td>
        </tr>
        </table>
        <h4 onclick="expandableById('result-json-data')" class="result-h">SHOW RAW JSON</h4>
        <div style="display: none" id="result-json-data">
        ${JSON.stringify(json)}
           <button class="default-button" onclick="clickToCopyAction('result-json-data');">Click to Copy</button>
         </div> 
`
}


export {expandableById, clickToCopyAction, generateHTML}