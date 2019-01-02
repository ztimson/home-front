import {Injectable} from '@angular/core';
import {firebaseApp} from '../app.module';

@Injectable({
    providedIn: 'root'
})
export class BatteryService {
    readonly firestore;

    batteries = [];
    charge: number;
    lastCharge: number;
    relayMode: string = 'null';
    temp: number = 0;

    get charging() { return this.lastCharge < this.charge; }

    get icon() {
        if (!this.batteries.length) return 'battery_alert';

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
            let data = snap.data();
            this.relayMode = data.config.relayMode ? data.config.relayMode.toString() : 'null';
            this.batteries = Object.keys(data.modules).map(key => {
                let last = data.modules[key].length - 1;
                return {
                    charge: data.modules[key][last].charge,
                    chargeHistory: data.modules[key].map((val, i) => ({name: i, value: val.charge})),
                    name: key,
                    temp: data.modules[key][last].temp,
                    tempHistory: data.modules[key].map((val, i) => ({name: i, value: val.temp}))
                }
            });
            this.lastCharge = this.charge;
            this.charge = this.batteries.reduce((acc, battery) => acc + battery.charge, 0) / 2;
            this.temp = this.batteries.reduce((acc, battery) => acc + battery.temp, 0) / 4;
        });
    }

    setRelayMode(mode?: string) {
        if(mode == 'null') this.firestore.collection('Battery').doc('170614D').update({config: {relayMode: null}});
        else if(mode == 'true') this.firestore.collection('Battery').doc('170614D').update({config: {relayMode: true}});
        else if(mode == 'false') this.firestore.collection('Battery').doc('170614D').update({config: {relayMode: false}});
    }
}
