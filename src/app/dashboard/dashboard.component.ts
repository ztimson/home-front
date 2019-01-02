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

    formatTime(date: Date) {
        if(!date) return '';
        let hours = date.getHours();
        let minutes = date.getMinutes();
        if(hours > 12) hours -= 12;
        return `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`
    }

    formatDate(date: Date) {
        if(!date) return '';
        return `${date.toDateString().substr(4, 3)} ${date.getDate()}`;
    }
}
