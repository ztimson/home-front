import {Injectable} from '@angular/core';
import {firebaseApp} from '../app.module';

@Injectable({
    providedIn: 'root'
})
export class BatteryService {
    readonly firestore;

    average = 0;
    temperatureData = [];
    chargeData = [];
    batteries = [];
    last: Date;

    get icon() {
        if (!this.batteries.length) return 'battery_alert';
        if (!this.last) return 'battery_warn';

        return 'battery_full';

        let temp = 'battery';
        //if (this.batteries.length) temp += '_charging';

        if (this.average <= 20) {
            temp += '_20';
        } else if (this.average <= 30) {
            temp += '_30';
        } else if (this.average <= 50) {
            temp += '_50';
        } else if (this.average <= 60) {
            temp += '_60';
        } else if (this.average <= 80) {
            temp += '_80';
        } else if (this.average <= 90) {
            temp += '_90';
        } else if (this.average > 90) {
            temp += 'full'
        }

        return temp;
    }

    constructor() {
        this.firestore = firebaseApp.firestore();
        this.firestore.settings({timestampsInSnapshots: true});
        this.firestore.collection('Battery').doc('170724D').onSnapshot(snap => {
            this.last = new Date();

            let data = snap.data();
            console.log(data);

            this.batteries = Object.keys(data.modules).map(key => ({name: key, history: data.modules[key]}));
            this.average = this.batteries.reduce((acc, battery) => acc + battery.history[0].charge, 0) / this.batteries.length;
            this.chargeData = this.batteries.map(battery => ({name: battery.name, series: battery.history.map((history, i) => ({name: i, value: history.charge}))}));
            this.temperatureData = this.batteries.map(battery => ({name: battery.name, series: battery.history.map((history, i) => ({name: i, value: Math.round((history.temp || 0) * 10) / 10}))}));
        });
    }
}
