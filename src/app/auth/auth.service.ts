import {Injectable} from "@angular/core";
import {BehaviorSubject, from} from "rxjs";
import {AngularFirestore} from "@angular/fire/firestore";
import {AngularFireAuth} from "@angular/fire/auth";
import {auth} from 'firebase';
import {Router} from "@angular/router";
import {flatMap, map, skip} from 'rxjs/operators';
import {User} from './user';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    readonly collection = 'Users';

    user = new BehaviorSubject<User>(null);

    constructor(private afAuth: AngularFireAuth, private router: Router, private db: AngularFirestore) {
        this.afAuth.user.pipe(
            flatMap((user: any) => {
                if(!user) return from([false]);
                let ref = this.db.collection(this.collection).doc(user.uid);
                return ref.valueChanges().pipe(map(dbUser => Object.assign({ref: ref}, user, dbUser)))
            })
        ).subscribe(user => this.user.next(<User>user));
    }

    async loginWithGoogle() {
        this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
        return this.user.pipe(skip(1));
    }

    async logout() {
        await this.afAuth.auth.signOut();
        return this.router.navigate(['/']);
    }
}
