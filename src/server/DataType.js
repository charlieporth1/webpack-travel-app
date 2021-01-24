const moment = require('moment')();

class ProjectData {
    constructor(data, weatherData, locationData) {
        if (data) {
            this.content = data.content || '';
            this.date = data.date || moment.format("MM.DD.YYYY");
            this.startDate = data.startDate || moment.format("MM.DD.YYYY");
            this.endDate = data.endDate || moment.format("MM.DD.YYYY");
            this.weather = new Weather(weatherData);
            this.location = new Location(locationData);
        }
    }
    refreshDate() {
        this.date = moment.format("MM.DD.YYYY HH:mm");
    }
}

class Weather {
    constructor(data) {
        if (data) {
            this.name = data.name || 'Minneapolis';
            if (data.coord)
                this.coor(data.coord);
            if (data.weather)
                this.stat(data.weather);
            if (data.main)
                this.mai(data.main);
            if (data.wind)
               this.win(data.wind);
            if (data.sys)
                this.sy(data.sys);
        }
    }

    coor (data)  {
        this.coord = {
            lon: data.lon || '',
            lat: data.lat || '',
        };
    }
    stat (data)  {
        this.status = {
            main: data.main || 'Haze',
            description: data.description || 'haze',
            icon: data.icon || '50d',
        };
    };
    mai (data) {
        this.main = {
            temp: data.temp || '',
            humidity: data.humidity || '',
            feelsLike: data.feels_like || '',
            tempMin: data.temp_min || '',
            tempMax: data.temp_max || '',
            pressure: data.pressure || '',
        };
    };
    win  (data) {
        this.wind = {
            speed: data.speed || '',
            deg: data.deg || '',
        };
    };
    sy  (data) {
        this.sys = {
            sunrise: data.sunrise || '1610113830',
            sunset: data.sunset || '1610146186',
        };
    };
}

class Location {
    constructor(data) {
        if (data) {
            if (data.postalcodes[0]) {
                const json = data.postalcodes[0];
                this.reigon = json.adminName1 || '';
                this.local = json.adminName2 || '';
                this.city = json.placeName || '';
                this.country = json.countryCode || '';
                this.postalCode = json.postalcode || '';
                this.reigonAb = json.adminCode1 || '';
                this.lat = json.lat || '';
                this.lon = json.lng || '';
            }
        }
    }
}

module.exports = {ProjectData};