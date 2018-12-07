import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {timer} from 'rxjs';
import {database} from 'firebase';

@Injectable({
    providedIn: 'root'
})
export class WeatherService {
    readonly apiKey = 'e8391af54b6fc09dc82b019fc68b8409';
    readonly city = 'London';
    readonly countryCode = 'CA';
    readonly days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    readonly weatherCodes = require('./weatherCodes.json');

    // Weather information
    cloudCover = 0;
    forecast = [];
    humidity = 0;
    icon: string;
    pop = 0;
    pressure = 0;
    sunrise: Date;
    sunset: Date;
    temp = 0;
    tempMin = 0;
    tempMax = 0;
    weather: string = '';
    wind: [number, number] = [0, 0];

    constructor(httpClient: HttpClient) {
        timer(0, 5 * 60000).subscribe(async () => {
            // Current weather information
            httpClient.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.city},${this.countryCode}&APPID=${this.apiKey}&units=metric`).toPromise().then((weather: any) => {
                this.cloudCover = weather.clouds.all;
                this.humidity = weather.main.humidity;
                this.icon = `wi-${this.weatherCodes[weather.weather[0].id].icon}`;
                this.pressure = weather.main.pressure;
                this.sunrise = new Date(weather.sys.sunrise);
                this.sunset = new Date(weather.sys.sunset);
                this.temp = Math.round(weather.main.temp);
                this.tempMin = Math.round(weather.main.temp_min);
                this.tempMax = Math.round(weather.main.temp_max);
                this.weather = weather.weather[0].description;
                this.wind = [weather.wind.deg, Math.round(weather.wind.speed)];
            });

            // 5 day forecast
            httpClient.get(`https://api.openweathermap.org/data/2.5/forecast?q=${this.city},${this.countryCode}&APPID=${this.apiKey}&units=metric`).toPromise().then((weather: any) => {
                this.pop = Math.round(weather.list.slice(0, 4).reduce((acc, weather) => {
                    if(weather['rain']) acc += weather['rain']['3h'] || 0;
                    if(weather['snow']) acc += weather['snow']['3h'] || 0;
                    return acc;
                }, 0) * 10) / 10;

                let temp = {};
                weather.list.forEach(weather => {
                    let timestamp = new Date(weather.dt * 1000);
                    let day = timestamp.getDate();
                    console.log(timestamp.getHours());
                    if(!temp[day]) temp[day] = {};
                    if(!temp[day].max || weather.main.temp_max > temp[day].max) temp[day].max = Math.round(weather.main.temp_max);
                    if(!temp[day].min || weather.main.temp_min < temp[day].min) temp[day].min = Math.round(weather.main.temp_min);
                    if(!temp[day].day || timestamp.getHours() == 13) {
                        temp[day].day = timestamp.toString().substring(0, 4);
                        temp[day].icon = `wi-${this.weatherCodes[weather.weather[0].id].icon}`;
                    }
                });
                this.forecast = Object.values(temp);
            });
        });
    }
}
