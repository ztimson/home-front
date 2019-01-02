import {Component} from '@angular/core';
import {WeatherService} from '../weather.service';

@Component({
  selector: 'weather-widget',
  templateUrl: './weatherWidget.component.html'
})
export class WeatherWidgetComponent {
  constructor(public weatherService: WeatherService) { }
}
