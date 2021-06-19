import {Component, OnInit} from '@angular/core';
import {BatteryService} from '../../services/battery.service';
import {AppComponent} from '../app/app.component';

declare const Gauge: any;

@Component({
    selector: 'app-batteries',
    templateUrl: './battery.component.html',
    styles: [`.selected { background-color: rgba(0, 0, 0, 0.1); }`]
})
export class BatteryComponent implements OnInit {
    batteries: any[] = [];
    gauge: any;
    socData: any[] = [];
    socLabels: string[] = [];
    socOptions = {
        responsive: true,
        scales: {
            xAxes: [{}],
            yAxes: [{
                ticks: {
                    min: 0,
                    max: 1.2,
                    step: 0.1,
                    callback: (label: any) => this.percent(Math.round(label * 100))
                }
            }]
        },
        tooltips: {
            callbacks: {
                label: (tooltipItem: any) => `SOC: ${this.percent(tooltipItem.yLabel * 100)}`
            }
        }
    };

    constructor(public app: AppComponent, public batteryService: BatteryService) {
        this.batteryService.data.subscribe((data) => {
            this.socLabels = data.filter(row => new Date(row.timestamp).getMinutes() % 15 == 0).map(row => this.dateFormat(new Date(row.timestamp)));
            this.socData = [{label: 'SOC', fill: false, data: data.filter(row => new Date(row.timestamp).getMinutes() % 15 == 0).map(row => row.soc)}];
            if(this.gauge) this.gauge.set(batteryService.last.power || 0);
            this.batteries = Object.keys(this.batteryService.modules).map((key: string) => {
                return {
                    name: `Module ${key}`,
                    negativeTemperature: this.batteryService.modules[key][this.batteryService.modules[key].length - 1].negativeTemperature,
                    positiveTemperature: this.batteryService.modules[key][this.batteryService.modules[key].length - 1].positiveTemperature,
                    voltage: this.batteryService.modules[key][this.batteryService.modules[key].length - 1].voltage
                }
            });
        });
    }

    ngOnInit() {
        const canvas = document.getElementById('netPower');
        if(!canvas) return;

        canvas.style.height = canvas.style.width;
        this.gauge = new Gauge(canvas).setOptions({
            angle: 0.2, // The span of the gauge arc
            lineWidth: 0.2, // The line thickness
            radiusScale: 1, // Relative radius
            pointer: {
                length: 0.5,
                strokeWidth: 0.035,
                color: '#000000'
            },
            limitMax: true,
            limitMin: true,
            generateGradient: true,
            highDpiSupport: true,
            staticLabels: {
                font: "75% sans-serif",
                labels: [-4000, 0, 4000],
                color: "black",
            },
            staticZones: [
                {strokeStyle: "#eb575c", min: -4000, max: 0},
                {strokeStyle: "#49b571", min: 0, max: 4000}
            ],
            renderTicks: {
                divisions: 2,
                divWidth: 1.1,
                divLength: 1,
                divColor: '#000',
                subDivisions: 4,
                subLength: 0.5,
                subWidth: 0.6,
                subColor: '#000'
            }
        });
        this.gauge.minValue = -4000;
        this.gauge.maxValue = 4000;
        this.gauge.set(this.batteryService.last.power); // set actual value
    }

    color() {
        return '#4f55b6';
    }

    percent(val: number) {
        return `${Math.round(val)}%`;
    }

    dateFormat(date: Date) {
        let hours = date.getHours();
        if(hours > 12) hours -= 12;

        let minutes: any = date.getMinutes();
        if(minutes < 10) minutes = '0' + minutes;

        return `${hours}:${minutes} ${date.getHours() > 12 ? 'PM' : 'AM'}`;
    }
}
