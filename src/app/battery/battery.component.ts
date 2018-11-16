import {Component, OnInit, ViewChild} from '@angular/core';
import {BatteryService} from './battery.service';
import {BarVerticalComponent} from '@swimlane/ngx-charts/release/bar-chart';
import {AppComponent} from '../app.component';

@Component({
    selector: 'app-batterys',
    templateUrl: './battery.component.html'
})
export class BatteryComponent implements OnInit {
    @ViewChild('chart1') chart1: BarVerticalComponent;
    @ViewChild('chart2') chart2: BarVerticalComponent;

    scheme = {
        name: 'cool',
        selectable: true,
        group: 'Ordinal',
        domain: ['#a8385d', '#7aa3e5', '#a27ea8', '#aae3f5', '#adcded', '#a95963', '#8796c0', '#7ed3ed', '#50abcc', '#ad6886']
    };

    constructor(public app: AppComponent, public batteryService: BatteryService) { }

    ngOnInit() {
        setTimeout(() => {
            this.chart1.update();
            this.chart2.update();
        }, 1000);
    }

    round(num: number) {
        return Math.round(num * 10) / 10;
    }
}
