import {Component, OnInit} from '@angular/core';
import {BatteryService} from './battery.service';
import {AppComponent} from '../app.component';

@Component({
    selector: 'app-batterys',
    templateUrl: './battery.component.html'
})
export class BatteryComponent implements OnInit {

    scheme = {
        name: 'cool',
        selectable: true,
        group: 'Ordinal',
        domain: ['#a8385d', '#7aa3e5', '#a27ea8', '#aae3f5', '#adcded', '#a95963', '#8796c0', '#7ed3ed', '#50abcc', '#ad6886']
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
