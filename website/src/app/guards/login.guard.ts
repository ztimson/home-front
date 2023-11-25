import {CanActivate, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable, timer} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
    providedIn: 'root'
})
export class LoginGuard implements CanActivate {
    loggedIn?: any;

    constructor(private auth: AngularFireAuth, private router: Router) {
        this.auth.onAuthStateChanged(user => this.loggedIn = !!user);
    }

    canActivate(): Observable<boolean> {
        return timer(0, 100).pipe(filter(() => this.loggedIn != null), map(() => {
            if(!this.loggedIn) this.router.navigate(['/login']);
            return this.loggedIn;
        }));
    }
}
