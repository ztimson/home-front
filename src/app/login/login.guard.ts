import {CanActivate, Router} from '@angular/router';
import {firebaseApp} from '../app.module';
import {Injectable} from '@angular/core';

@Injectable()
export class LoginGuard implements CanActivate {

    constructor(private router: Router) {}

    canActivate() {
        let valid = !!firebaseApp.auth().currentUser;
        if(!valid) this.router.navigate(['/login']);
        return valid;
    }
}
