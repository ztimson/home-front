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

        let temp = 'battery';
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

        return temp;
    }

    constructor(private firestore: AngularFirestore) {
        let afterDate = new Date();
        afterDate.setDate(afterDate.getDate() - 1);

        this.firestore.collection('Battery').doc('170614D').collection('data', ref => ref.where('timestamp', '>=', afterDate).orderBy('timestamp')).valueChanges().subscribe(data => {
            this.batteries = data.reduce((acc, row) => {
                row.payload.forEach((data, i) => {
                    if(!acc[i]) acc[i] = [];
                    acc[i].push(Object.assign(data, {timestamp: row.timestamp.toDate()}));
                });
                return acc;
            }, []).map((module, i) => {
                const last = module[module.length - 1];
                return {
                    charge: last.charge,
                    chargeHistory: module.map(row => ({name: row.timestamp, value: row.temp})),
                    lastUpdate: last.timestamp,
                    name: `Module ${i + 1}`,
                    temp: last.temp,
                    tempHistory: module.map(row => ({name: row.timestamp, value: row.temp}))
                };
            });

            this.lastCharge.push(this.charge);
            this.lastCharge.splice(0, this.lastCharge.length - 3);
            this.lastUpdate = this.batteries[0].lastUpdate;
            this.charge = this.batteries.reduce((acc, module) => acc + module.charge, 0) / 2;
            this.temp = this.batteries.reduce((acc, module) => acc + module.temp, 0) / this.batteries.length;
        });
    }

    setRelayMode(mode?: string) {
        if(mode == 'null') this.firestore.collection('Battery').doc('170614D').update({config: {relayMode: null}});
        else if(mode == 'true') this.firestore.collection('Battery').doc('170614D').update({config: {relayMode: true}});
        else if(mode == 'false') this.firestore.collection('Battery').doc('170614D').update({config: {relayMode: false}});
    }
}
