import { ForgotPasswordComponent } from './../components/main-login/forgot-password/forgot-password.component';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase  } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(public afAuth:AngularFireAuth){}
  alertError: boolean = false;
  errMessage: string= "";

  succValue:boolean = false;
  
  signInWithEmailAndPassword(email: string, pass: string){
return this.afAuth.auth.signInWithEmailAndPassword(email, pass)

  }
  createUserWithEmailAndPassword(email: string, pass: string) {
   
    return this.afAuth.auth.createUserWithEmailAndPassword(email, pass)
  }  

  // forgotPassword(email: string){
  //   return this.afAuth.auth.
  // }

  


  // items: Observable<any[]>;

  // constructor(
  //   public db: AngularFireDatabase,
  //   public afAuth: AngularFireAuth) {
  //     console.log('here');
  //     this.items = db.list('/users').valueChanges();
  //     //this.test = db.list('/test');
  //     this.afAuth.auth.onAuthStateChanged(user => {
  //       if (user) {
  //         // User is signed in.
  //         alert('User is logged in!!!! ');
  //       } else {
  //         // No user is signed in.
  //         alert('User is logged out!!!! ');
  //         }
  //     });
  // }

  // createUserWithEmailAndPassword() {
  //   this.afAuth.auth.createUserWithEmailAndPassword('bossssssssssss@gmail.com', 'password12').catch(error =>  {
  //     // Handle Errors here.
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  //     // ...
  //     alert(errorCode + ' ' + errorMessage);
  //   });
  // }


   loginUser(email: string, pass: string) {
     this.afAuth.auth.signInWithEmailAndPassword(email, pass)
    .then(success => {
      
     alert('Successs login!!!! ' + success);
     })
     .catch(error =>  {
      // Handle Errors here.
       const errorCode = error.code;
       const errorMessage = error.message;
       if(error.message.includes("Date de logare incorecte") == true)
      {
        this.alertError = true;
        this.errMessage = error.message;
      }
       // ...
       alert(errorCode + ' ' + errorMessage);
     });
   }


  // logoutUser() {
  //   this.afAuth.auth.signOut()
  //   .then(logout =>  {
  //     // Sign-out successful.
  //     alert('Logout!!!! ' + logout);

  //   }).catch(error =>  {
  //     // An error happened.
  //     alert('An error happened!!!! ' + error);
  //   });
  // }
 
}
