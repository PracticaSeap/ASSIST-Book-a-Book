import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase  } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  items: Observable<any[]>;
  test;
  constructor(
    db: AngularFireDatabase,
    public afAuth: AngularFireAuth) {
      console.log('here');
      this.items = db.list('/users').valueChanges();
      this.test = db.list('/test');
      this.afAuth.auth.onAuthStateChanged(user => {
        if (user) {
          // User is signed in.
          alert('User is logged in!!!! ');
        } else {
          // No user is signed in.
          alert('User is logged out!!!! ');
          }
      });
  }

  createUserWithEmailAndPassword() {
    this.afAuth.auth.createUserWithEmailAndPassword('bossssssssssss@gmail.com', 'password12').catch(error =>  {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // ...
      alert(errorCode + ' ' + errorMessage);
    });
  }
  loginUser() {
    this.afAuth.auth.signInWithEmailAndPassword('bossssssssssss@gmail.com', 'password12')
    .then(success => {
      alert('Successs login!!!! ' + success);
    })
    .catch(error =>  {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // ...
      alert(errorCode + ' ' + errorMessage);
    });
  }
  logoutUser() {
    this.afAuth.auth.signOut()
    .then(logout =>  {
      // Sign-out successful.
      alert('Logout!!!! ' + logout);

    }).catch(error =>  {
      // An error happened.
      alert('An error happened!!!! ' + error);
    });
  }
  sendDataToTest() {
    console.log('this.test', this.test);
    this.test.push({
      trial1: 'sebastian1sssssssssssss',
      trial2: 'sebastian2',
      trial3: 'sebastian3',
      trial4: 'sebastian4',
    });
  }
}
