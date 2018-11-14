import {Component} from '@angular/core';
import {BatteryService} from './battery/battery.service';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {environment} from '../environments/environment';
import {expandDown, routerTransition} from './animations';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    animations: [expandDown, routerTransition]
})
export class AppComponent {
    hide = false;
    mobile = true;
    open = false;
    environment = environment;

    constructor(public batteryService: BatteryService, router: Router, route: ActivatedRoute, breakpointObserver: BreakpointObserver) {
        router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
            this.hide = !!route.root.firstChild.snapshot.data.hide;
            if(this.hide) this.open = false;
        });

        breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
            this.mobile = result.matches;
            this.open = !this.hide && !this.mobile;
        })
    }
}
