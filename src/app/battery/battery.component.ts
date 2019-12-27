import {Component, OnInit} from '@angular/core';
import {BatteryService} from './battery.service';
import {AppComponent} from '../app.component';

@Component({
    selector: 'app-batterys',
    templateUrl: './battery.component.html',
    styles: [`.selected { background-color: rgba(0, 0, 0, 0.1); }`]
})
export class BatteryComponent implements OnInit {
    batteries = [];
    scheme = {
        name: 'cool',
        selectable: true,
        group: 'Ordinal',
        domain: ['#2830a8']
    };
    selected = 0;

    constructor(public app: AppComponent, public batteryService: BatteryService) {
        this.batteryService.data.subscribe((data) => {
            console.log(data);
            this.batteries = Object.keys(this.batteryService.modules).map(key => {
                return {
                    name: `Module ${key}`,
                    chargeHistory: this.batteryService.modules[key].map(row => ({name: new Date(row.timestamp), value: row.voltage})),
                    tempHistory: this.batteryService.modules[key].map(row => ({name: new Date(row.timestamp), value: row.temperature})),
                    temperature: this.batteryService.modules[key][this.batteryService.modules[key].length - 1].temperature,
                    voltage: this.batteryService.modules[key][this.batteryService.modules[key].length - 1].voltage
                }
            });
        });
    }

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
