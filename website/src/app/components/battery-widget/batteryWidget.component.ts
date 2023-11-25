import {Component} from '@angular/core';
import {BatteryService} from '../../services/battery.service';

@Component({
  selector: 'battery-widget',
  templateUrl: './batteryWidget.component.html'
})
export class BatteryWidgetComponent {
  constructor(public batteryService: BatteryService) { }
}
