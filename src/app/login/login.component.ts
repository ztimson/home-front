import {Component, NgZone, OnInit} from '@angular/core';
import {firebaseApp} from '../app.module';
import {Router} from '@angular/router';
import * as firebase from 'firebase';
import {expandDown, fade} from '../animations';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    animations: [expandDown, fade]
})
export class LoginComponent implements OnInit {
    loading = false;

    constructor(private router: Router, private ngZone: NgZone) { }

    ngOnInit() {
        firebaseApp.auth().onAuthStateChanged(user => {
            if(!!user) this.ngZone.run(() => this.router.navigate(['/dashboard']));
        });
    }

    async login() {
        this.loading = true;
        await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
        await firebaseApp.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
        this.loading = false;
        this.router.navigate(['/dashboard']);
    }
}
