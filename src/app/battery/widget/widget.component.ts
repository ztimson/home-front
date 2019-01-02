import { Component, OnInit } from '@angular/core';
import {BatteryService} from '../battery.service';

@Component({
  selector: 'battery-widget',
  templateUrl: './widget.component.html'
})
export class WidgetComponent implements OnInit {

  constructor(public batteryService: BatteryService) { }

  ngOnInit() { }
}
