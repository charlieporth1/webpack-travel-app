function setPlaceholder(elementId, text) {
    window.document.getElementById(elementId.toString().trim()).placeholder = text;
}

function  setValue(elementId, text) {
    window.document.getElementById(elementId.toString().trim()).value = text;
}

function getInputValue(inputId) {
    return String(window.document.getElementById(inputId.toString().trim()).value).trim();
}

const dateFormat = (addDays = 0) => {
    const dd = new Date();
    return `${dd.getMonth()}/${dd.getDay() + addDays}/${dd.getFullYear()}`.toLocaleString()
};

const kelvinToF = (tempInKelvin) => {
    // Prompting the user to enter today's Kelvin temperature
    const kelvin = tempInKelvin;

// Celsius is 273 degrees less than Kelvin
    const celsius = kelvin - 273;

// Calculating Fahrenheit temperature to the nearest integer
    let fahrenheit = Math.floor(celsius * (9 / 5) + 32);
    return fahrenheit;
};


export {dateFormat, kelvinToF, setValue, setPlaceholder, getInputValue}
