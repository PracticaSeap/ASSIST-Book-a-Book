import { DashboardComponent } from './../../dashboard/dashboard.component';
import { appRoutes } from './../../../app.routes';
import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
fullname: string
email: string
password: string
userCreatedSucess = 1;
alertError: boolean = false;
errMessage: string= "";
succValue:boolean = false;
  constructor(public loginservice: LoginService,
    public afAuth:AngularFireAuth,
    private router: Router
    ) 
  { }

  ngOnInit() {
  }
  loginUser(){

    this.afAuth.auth.signInWithEmailAndPassword(this.email, this.password)
    .then(success => {


     this.succValue = true

      this.redirect()
     //setTimeout(()=>{this.router.navigate(['dashboard']);}, 3000)
     

     })



     

     .catch(error =>  {
      // Handle Errors here.
       const errorCode = error.code;
       const errorMessage = error.message;
       this.alertError = true;
       // ...
       //alert(errorCode + ' ' + errorMessage);
     });


  }
  onKeyEmail(event: any) { // without type info
    this.email = event.target.value;
    this.alertError = false;
    this.succValue = false;
  }

  onKeyPassword(event: any) { // without type info
    this.password = event.target.value;
    this.alertError = false;
    this.succValue = false;
  }

  redirect(){
    if (this.succValue==true){
    setTimeout(()=>{this.router.navigate(['dashboard']);}, 3000);
    }
  }
}

