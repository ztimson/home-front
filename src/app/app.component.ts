import {Component} from '@angular/core';
import {BatteryService} from './battery/battery.service';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {environment} from '../environments/environment';
import {expandDown, routerTransition} from './animations';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';
import {WeatherService} from './weather/weather.service';
import {firebaseApp} from './app.module';

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
        await firebaseApp.auth().signOut();
        return this.router.navigate(['/login'])
    }

    getState(outlet) {
        if(!outlet.isActivated) return '';
        return outlet.activatedRouteData.noAnimation ? '' : outlet.activatedRoute;
    }
}
