import {Component, NgZone, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import firebase from 'firebase';
import {expandDown, fadeIn, fadeOut} from '../../animations';
import {AngularFireAuth} from '@angular/fire/auth';
import GoogleAuthProvider = firebase.auth.GoogleAuthProvider;

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
        this.auth.onAuthStateChanged(user => {
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
        await this.auth.signInWithPopup(new GoogleAuthProvider());
        this.loading = false;
    }
}
