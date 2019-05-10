import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { LoginService } from 'src/app/services/login.service';
import { StringFormat } from '@angular/fire/storage/interfaces';
import { NgIf } from '@angular/common';
import { strictEqual } from 'assert';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  fullname: string;
  email: string;
  password: string;
  userCreatedSucess = 0;

  alertError: boolean = false;
  errMessage: string= "";

  succValue:boolean = false;
  constructor(public loginservice: LoginService){}
  //constructor(public loginservice: LoginService) {}

  

  ngOnInit() {

  }

  createUserWithEmailAndPassword(){
    this.loginservice.createUserWithEmailAndPassword(this.email, this.password)
    .then(sucess=>{
      this.userCreatedSucess = 1;
      this.succValue = true;
    })
    .catch(error =>  {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // ...
      //alert(errorCode + ' ' + errorMessage);
      
      if(error.message.includes("already in use") == true)
      {
        this.alertError = true;
        this.errMessage = error.message;
      }

      this.userCreatedSucess = 2;
    });
    // console.log(this.email);

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

  onKeyFullName(event: any) { // without type info
    this.fullname = event.target.value;
    this.alertError = false;
    this.succValue = false;
  }
}
