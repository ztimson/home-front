import {CanActivate, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {AuthService} from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate {

    constructor(private auth: AuthService) {}

    canActivate(): Observable<boolean> {
        return this.auth.user.pipe(filter((user: any) => user != null), map(user => user && user.isAdmin));
    }
}
