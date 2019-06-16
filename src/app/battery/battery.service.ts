import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root'
})
export class BatteryService {
    batteries = [];
    charge: number;
    lastCharge: number[] = [];
    lastUpdate = new Date().getTime();
    relayMode: string = 'null';
    temp: number = 0;

    get charging() { return this.lastCharge.reduce((acc, v) => acc + v, 0) / this.lastCharge.length < this.charge; }

    get icon() {
        if (new Date().getTime() - this.lastUpdate > 120000) return 'battery_alert';

        return 'battery_full';

        /*let temp = 'battery';
        if (this.batteries.length) temp += '_charging';

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

        return temp;*/
    }

    constructor(private firestore: AngularFirestore) {
        this.firestore.collection('Battery').doc('170614D').snapshotChanges().subscribe(snap => {
            this.lastUpdate = new Date().getTime();
            let data: any = snap.payload.data();
            this.relayMode = data.config.relayMode ? data.config.relayMode.toString() : 'null';
            this.batteries = Object.keys(data.modules).map(key => {
                let last = data.modules[key].length - 1;
                return {
                    charge: data.modules[key][last].charge,
                    chargeHistory: data.modules[key].map(val => ({name: val.timestamp.toDate(), value: val.charge})),
                    lastUpdate: data.modules[key][last].timestamp.toDate(),
                    name: key,
                    temp: data.modules[key][last].temp,
                    tempHistory: data.modules[key].map(val => ({name: val.timestamp.toDate(), value: val.temp}))
                }
            });
            this.lastCharge.push(this.charge);
            this.lastCharge.splice(0, this.lastCharge.length - 5);
            this.lastUpdate = this.batteries.reduce((acc, battery) => acc > battery.lastUpdate ? acc : battery.lastUpdate, 0);
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
