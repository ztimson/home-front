import {Component, OnInit} from '@angular/core';
import {BatteryService} from './battery.service';
import {AppComponent} from '../app.component';

@Component({
    selector: 'app-batterys',
    templateUrl: './battery.component.html',
    styles: [`.selected { background-color: rgba(0, 0, 0, 0.1); }`]
})
export class BatteryComponent implements OnInit {

    locked = true;
    scheme = {
        name: 'cool',
        selectable: true,
        group: 'Ordinal',
        domain: ['#2830a8']
    };
    selected = 0;

    constructor(public app: AppComponent, public batteryService: BatteryService) { }

    ngOnInit() { }

    dateFormat(date: Date) {
        let hours = date.getHours();
        if(hours > 12) hours -= 12;

        let minutes: any = date.getMinutes();
        if(minutes < 10) minutes = '0' + minutes;

        return `${hours}:${minutes} ${date.getHours() > 12 ? 'PM' : 'AM'}`;
    }

    voltFormat(val) {
        return `${val} V`
    }

    tempFormat(val) {
        return `${val} °C`
    }
}
