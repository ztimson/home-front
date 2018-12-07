import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {WeatherIcons} from './weatherIcons';
import {timer} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class WeatherService {
    icon: string;
    lat = 42.9849;
    lng = -81.2453;
    units = 'ca';
    weather: any;

    constructor(http: HttpClient) {
        // Get weather every 5 minutes
        timer(0, 5 * 60000).subscribe(async () => {
            this.weather = await http.get(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/88373fac9e52db6ad33a296f3b30404d/${this.lat},${this.lng}?units=${this.units}`).toPromise();

            // Format data
            this.weather.daily.data.map(day => Object.assign(day, {
                icon: WeatherIcons[day.icon],
                time: new Date(day.time * 1000),
                sunsetTime: new Date(day.sunsetTime * 1000),
                sunriseTime: new Date(day.sunriseTime * 1000),
            }));
            this.icon = WeatherIcons[this.weather.currently.icon];
        });
    }
}
