
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { auth } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { reject, resolve } from 'q';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afsAuth: AngularFireAuth) { }

  registerUser(email: string, pass: string) {

    return new Promise((resolve, reject) => {

      this.afsAuth.auth.createUserWithEmailAndPassword(email, pass)
      .then(userData => resolve(userData)
      , err => reject(err));

    });

  }

  loginEmailUser(email: string, pass: string) {

    return new Promise((resolve, reject) =>{

        this.afsAuth.auth.signInWithEmailAndPassword(email, pass).then(userData => resolve(userData),
        err => reject(err));

    });

  }

  loginFacebookUser() {

    return this.afsAuth.auth.signInWithPopup(new auth.FacebookAuthProvider());

  }

  isAuth() {

    return this.afsAuth.authState.pipe(map(auth => auth));

  }

  loginGoogleUser() {

    return this.afsAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());

  }

  logoutUser() {

    return this.afsAuth.auth.signOut();

  }
}
