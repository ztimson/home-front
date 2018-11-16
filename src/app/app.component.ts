import {Component} from '@angular/core';
import {BatteryService} from './battery/battery.service';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {environment} from '../environments/environment';
import {collapseUp, expandDown, routerTransition} from './animations';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';
import {WeatherService} from './weather/weather.service';
import {firebaseApp} from './app.module';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    animations: [collapseUp, expandDown, routerTransition]
})
export class AppComponent {
    hide = false; // Hide nav
    mobile = true; // Mobile or desktop size
    noTransition = false; // Stop router transitions
    open = false; // Side nav open
    environment = environment; // Environment ref

    constructor(private router: Router, public batteryService: BatteryService, public weatherService: WeatherService, route: ActivatedRoute, breakpointObserver: BreakpointObserver) {
        router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
            this.hide = !!route.root.firstChild.snapshot.data.hide;
            this.open = !this.hide && !this.mobile;
        });

        breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
            this.mobile = result.matches;
            this.open = !this.mobile;
        })
    }

    async logout() {
        this.noTransition = true;
        await firebaseApp.auth().signOut();
        return this.router.navigate(['/login']).then(() => this.noTransition = false);
    }

    getState(outlet) {
        if(!outlet.isActivated || !!outlet.activatedRouteData.noAnimation || this.noTransition) return '';
        return outlet.activatedRoute;
    }
}
