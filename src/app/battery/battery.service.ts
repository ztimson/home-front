import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class BatteryService {
    percentage: number[] = [0];
    charging: boolean;

    get average() {
        return this.percentage.reduce((acc, battery) => acc + battery, 0) / this.percentage.length;
    }

    get icon() {
        if (this.charging == null) return 'battery_unknown';

        let temp = 'battery';
        if (this.charging) temp += '_charging';

        let average = this.average;
        if (average <= 20) {
            temp += '_20';
        } else if (average <= 30) {
            temp += '_30';
        } else if (average <= 50) {
            temp += '_50';
        } else if (average <= 60) {
            temp += '_60';
        } else if (average <= 80) {
            temp += '_80';
        } else if (average <= 90) {
            temp += '_90';
        } else if (average > 90) {
            temp += 'full'
        }

        return temp;
    }

    constructor() {
    }
}
