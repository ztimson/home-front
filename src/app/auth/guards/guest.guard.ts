import {CanActivate, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {filter, map, tap} from 'rxjs/operators';
import {AuthService} from '../auth.service';

@Injectable({
    providedIn: 'root'
})
export class GuestGuard implements CanActivate {

    constructor(private auth: AuthService, private router: Router) {}

    canActivate(): Observable<boolean> {
        return this.auth.user.pipe(filter((user: any) => user != null), map(user => user && user.isAnonymous), tap(auth => auth ? this.router.navigate(['/']) : null));
    }
}
