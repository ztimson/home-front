import {Component} from '@angular/core';
import {BatteryService} from './battery/battery.service';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {environment} from '../environments/environment';
import {routerTransition} from './animations';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    animations: [routerTransition]
})
export class AppComponent {
    mobile = true;
    open = false;
    environment = environment;

    constructor(public batteryService: BatteryService, breakpointObserver: BreakpointObserver) {
        breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
            this.mobile = result.matches;
            this.open = !this.mobile;
        })
    }
}
