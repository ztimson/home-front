import {Component, OnInit} from '@angular/core';
import {BatteryService} from './battery.service';
import {AppComponent} from '../app.component';

@Component({
    selector: 'app-batterys',
    templateUrl: './battery.component.html'
})
export class BatteryComponent implements OnInit {

    locked = true;
    scheme = {
        name: 'cool',
        selectable: true,
        group: 'Ordinal',
        domain: ['#2830a8']
    };
    selected;

    constructor(public app: AppComponent, public batteryService: BatteryService) { }

    ngOnInit() { }

    voltFormat(val) {
        return `${val} V`
    }

    tempFormat(val) {
        return `${val} °C`
    }
}
