import { Component, OnInit } from '@angular/core';
import {WeatherService} from './weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html'
})
export class WeatherComponent implements OnInit {

  constructor(public weatherService: WeatherService) { }

  ngOnInit() {
  }

}
