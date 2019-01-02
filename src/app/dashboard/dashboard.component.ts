import {Component} from '@angular/core';
import {timer} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
    now = timer(0, 1000).pipe(map(() => new Date()));

    constructor() { }
}
