// import 'bootstrap';
import './js/css_files';
import {createWeatherClick} from './js/weather_app';
import {displayDt} from './js/display_dt';

window.createWeatherClick = createWeatherClick;
window.displayDt = displayDt;

createWeatherClick();
displayDt();