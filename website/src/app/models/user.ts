import {AngularFirestoreDocument} from '@angular/fire/firestore';
import firebase from 'firebase';
import User = firebase.User;

export interface IUser extends User {
    ref?: AngularFirestoreDocument;

    isAdmin: boolean;
    battery: string;
}
