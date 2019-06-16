import {Component, NgZone, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import * as firebase from 'firebase';
import {expandDown, fadeIn, fadeOut} from '../animations';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    animations: [expandDown, fadeIn, fadeOut]
})
export class LoginComponent implements OnInit {
    animate = false;
    show = true;
    loading = false;

    constructor(private auth: AngularFireAuth, private ngZone: NgZone, public router: Router) { }

    ngOnInit() {
        this.auth.auth.onAuthStateChanged(user => {
            if(!!user) {
                this.show = false;
                setTimeout(() => {
                    this.ngZone.runTask(() => this.router.navigate(['/dashboard']));
                }, 800);
            }
        });

        setTimeout(() => this.animate = true, 1000);
    }

    async login() {
        this.loading = true;
        await this.auth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
        this.loading = false;
    }
}
