import {Injectable} from '@angular/core';
import {firebaseApp} from '../app.module';

@Injectable({
    providedIn: 'root'
})
export class BatteryService {
    readonly firestore;

    batteries = [];
    last: Date;
    relayMode?: boolean = null;
    total: number = 0;

    get icon() {
        if (!this.batteries.length) return 'battery_alert';
        if (!this.last) return 'battery_warn';

        return 'battery_full';

        let temp = 'battery';
        // if (this.batteries.length) temp += '_charging';

        /*if (this.average <= 20) {
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
        }*/

        return temp;
    }

    constructor() {
        this.firestore = firebaseApp.firestore();
        this.firestore.settings({timestampsInSnapshots: true});
        this.firestore.collection('Battery').doc('170614D').onSnapshot(snap => {
            this.last = new Date();
            let data = snap.data();

            this.relayMode = data.config.relayMode || null;

            this.batteries = Object.keys(data.modules).map(key => {
                let last = data.modules[key].length - 1;
                return {
                    charge: data.modules[key][last].charge,
                    chargeHistory: data.modules[key].map((val, i) => ({name: i, value: val.charge})),
                    charging: data.modules[key][last] > data.modules[key][last - 1],
                    name: key,
                    temp: data.modules[key][last].temp,
                    tempHistory: data.modules[key].map((val, i) => ({name: i, value: val.temp}))
                }
            });
            this.total = this.batteries.reduce((acc, battery) => acc + battery.charge, 0) / 2;
        });
    }

    setRelayMode(mode?:boolean) {
        this.firestore.collection('Battery').doc('170614D').update({config: {relayMode: mode}});
    }
}
