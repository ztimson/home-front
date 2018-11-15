import {Component, NgZone, OnInit} from '@angular/core';
import {environment} from '../../environments/environment';
import {firebaseApp} from '../app.module';
import {Router} from '@angular/router';
import * as firebase from 'firebase';
import {expandDown} from '../animations';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    animations: [expandDown]
})
export class LoginComponent implements OnInit {
    animate = false;
    environment = environment;

    constructor(private router: Router, private ngZone: NgZone) { }

    ngOnInit() {
        firebaseApp.auth().onAuthStateChanged(user => {
            if(!!user) this.ngZone.run(() => this.router.navigate(['/dashboard']));
        });

        setTimeout(this.ngZone.run(() => this.animate = true), 1000);
    }

    async login() {
        await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
        await firebaseApp.auth().signInWithRedirect(new firebase.auth.GoogleAuthProvider());
        this.ngZone.run(() => {
            return this.router.navigate(['/dashboard']);
        });
    }
}
