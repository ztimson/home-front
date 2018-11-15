import {Component} from '@angular/core';
import {BatteryService} from './battery.service';
import {firebaseApp} from '../app.module';

@Component({
    selector: 'app-batterys',
    templateUrl: './battery.component.html'
})
export class BatteryComponent {
    tempHist = [];

    constructor(public batteryService: BatteryService) {
        firebaseApp.firestore().collection('Battery').doc('TEMP').onSnapshot(snap => {
            this.tempHist.push(Math.round(snap.get('temp') * 10) / 10);
        })
    }
}
