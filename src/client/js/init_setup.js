import {dateFormat, setPlaceholder, setValue} from "./utils";


function setupDatePickers() {
    setPlaceholder('travel-start-date', dateFormat());
    setPlaceholder('travel-end-date', dateFormat(12));
    setValue('travel-start-date', dateFormat());
    setValue('travel-end-date', dateFormat(12));
}

export {setupDatePickers}