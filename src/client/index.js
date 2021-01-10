// import 'bootstrap';
import './js/css_files';
import './js/utils';
import {createWeatherClick, modifyDom, getData, onSubmit} from './js/weather_app';
import {expandableById, clickToCopyAction, generateHTML} from './js/result_handler'
import {displayDt} from './js/display_dt';
import {toggleLoader} from "./js/toggle_loading";
import {dateFormat, getInputValue, kelvinToF, setPlaceholder, setValue} from "./js/utils";
import {setupDatePickers} from './js/init_setup';


window.dateFormat = dateFormat;
window.kelvinToF = kelvinToF;
window.getInputValue = getInputValue;
window.setValue = setValue;
window.setPlaceholder = setPlaceholder;

window.generateHTML = generateHTML;
window.expandableById = expandableById;
window.clickToCopyAction = clickToCopyAction;

window.toggleLoader = toggleLoader;
window.displayDt = displayDt;

window.modifyDom = modifyDom;
window.kelvinToF = kelvinToF;
window.getData = getData;
window.onSubmit = onSubmit;

window.createWeatherClick = createWeatherClick;
window.displayDt = displayDt;
window.setupDatePickers = setupDatePickers;
createWeatherClick();
displayDt();
setupDatePickers();