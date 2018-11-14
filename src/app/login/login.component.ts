import {Component, NgZone, OnInit} from '@angular/core';
import {environment} from '../../environments/environment';
import {firebaseApp} from '../app.module';
import {Router} from '@angular/router';
import * as firebase from 'firebase';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
    environment = environment;

    constructor(private router: Router, private ngZone: NgZone) { }

    ngOnInit() {
        firebaseApp.auth().onAuthStateChanged(user => {
            if(!!user) let ignore = this.ngZone.run(() => this.router.navigate(['/dashboard']));
        })
    }

    async login() {
        await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
        await firebaseApp.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
        return this.router.navigate(['/dashboard']);
    }
}
