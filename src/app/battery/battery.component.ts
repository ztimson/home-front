import {Component} from '@angular/core';
import {BatteryService} from './battery.service';

@Component({
    selector: 'app-batterys',
    templateUrl: './battery.component.html'
})
export class BatteryComponent {

    airScheme = {
        name: 'air',
        selectable: true,
        group: 'Continuous',
        domain: ['#e1f5fe', '#b3e5fc', '#81d4fa', '#4fc3f7', '#29b6f6', '#03a9f4', '#039be5', '#0288d1', '#0277bd', '#01579b']
    };

    fireScheme = {
        name: 'flame',
        selectable: false,
        group: 'Continuous',
        domain: ['#00deff', '#3db0ff', '#a274d7', '#c42576', '#9f0000']
    };

    constructor(public batteryService: BatteryService) { }

    round(num: number) {
        return Math.round(num * 10) / 10;
    }
}
