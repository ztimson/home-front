import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Battery} from './battery';
import {BehaviorSubject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class BatteryService {
    data = new BehaviorSubject<Battery[]>([]);
    last: Battery = <Battery>{};
    modules = [];

    get charging() {
        let value = this.data.value;
        if(!value.length) return null;
        let last = value[value.length - 1];
        let secondLast = value[value.length - 2];
        return last.soc > secondLast.soc;
    }

    get icon() {
        if(!this.last || new Date().getTime() - this.last.timestamp > 300000) return 'battery_alert';
        if(this.charging) return 'battery_charging_full';
        return 'battery_full';
    }

    constructor(private firestore: AngularFirestore) {
        let afterDate = new Date();
        afterDate.setDate(afterDate.getDate() - 1);

        this.firestore.collection('Battery').doc('170614D').collection<Battery>('data', ref => ref.where('timestamp', '>=', afterDate.getTime()).orderBy('timestamp')).valueChanges().subscribe(data => {
            this.modules = data.reduce((acc: any, row) => {
                Object.keys(row.modules).forEach(module => {
                    if(!acc[module]) acc[module] = [];
                    acc[module].push(Object.assign(row.modules[module], {timestamp: row.timestamp}));
                });
                return acc;
            }, {});

            this.last = data[data.length - 1];
            this.data.next(data);
        });
    }
}
