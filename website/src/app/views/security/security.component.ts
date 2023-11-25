import {Component} from '@angular/core';

@Component({
    selector: 'app-security',
    templateUrl: './security.component.html'
})
export class SecurityComponent {
    armed: boolean = false;
    log = [
        {timestamp: new Date(), message: 'Currently under construction'},
        {timestamp: new Date(), message: 'Give the power button a flick!'},
    ];

    constructor() { }

    toggle() {
        this.armed = !this.armed;
        this.log = [{timestamp: new Date(), message: this.armed ? 'Arming Security' : 'Disengaged'}].concat(this.log);
    }
}
