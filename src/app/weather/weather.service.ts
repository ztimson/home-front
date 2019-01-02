import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subscription, timer} from 'rxjs';
import {environment} from '../../environments/environment';
import {Weather} from './weather';
import {WeatherIcons} from './weatherIcons';

@Injectable({
    providedIn: 'root'
})
export class WeatherService {
    locationKey: string;
    metric = true;
    sub: Subscription;
    weather: Weather[];

    get icon() {
        if(!this.weather.length) return '';
        return this.weather[0].icon;
    }

    constructor(private http: HttpClient) {
        this.search('London ON');
    }

    async search(text: string) {
        this.locationKey = (await this.http.get(`http://dataservice.accuweather.com/locations/v1/search?apikey=${environment.accuWeather}&q=${text}`).toPromise())[0].Key;
        this.update();
    }

    async update() {
        if(this.sub) {
            this.sub.unsubscribe();
            this.sub = null;
        }

        this.sub = timer(0, 60000).subscribe(async () => {
            let temp: any = await this.http.get(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${this.locationKey}?apikey=${environment.accuWeather}&metric=${this.metric}&details=true`).toPromise();
            this.weather = temp['DailyForecasts'].map(forecast => ({
                cloudCover: forecast.Day.CloudCover / 100,
                date: new Date(forecast.Date),
                high: forecast.Temperature.Maximum.Value,
                icon: WeatherIcons[forecast.Day.Icon],
                low: forecast.Temperature.Minimum.Value,
                phrase: forecast.Day.ShortPhrase,
                pop: forecast.Day.PrecipitationProbability / 100,
                sunrise: new Date(forecast.Sun.Rise),
                sunset: new Date(forecast.Sun.Set),
            }));
            temp = (await this.http.get(`http://dataservice.accuweather.com/currentconditions/v1/${this.locationKey}?apikey=${environment.accuWeather}&details=true`).toPromise())[0];
            Object.assign(this.weather[0], {
                cloudCover: temp.CloudCover / 100,
                current: temp.Temperature[this.metric ? 'Metric' : 'Imperial'].Value,
                feelsLike: temp.RealFeelTemperature[this.metric ? 'Metric' : 'Imperial'].Value,
                humidity: temp.RelativeHumidity,
                icon: WeatherIcons[temp.WeatherIcon],
                UVIndex: temp.UVIndex,
                wind: {direction: temp.Wind.Direction.Degrees, speed: temp.Wind.Speed[this.metric ? 'Metric' : 'Imperial'].Value, gusts: temp.WindGust.Speed[this.metric ? 'Metric' : 'Imperial'].Value}
            });
        });
    }
}
