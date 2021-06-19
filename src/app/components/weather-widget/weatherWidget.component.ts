import {Component} from '@angular/core';
import {WeatherService} from '../../services/weather.service';

@Component({
  selector: 'weather-widget',
  templateUrl: './weatherWidget.component.html'
})
export class WeatherWidgetComponent {
  constructor(public weatherService: WeatherService) { }
}
