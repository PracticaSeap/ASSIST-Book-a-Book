import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { User } from 'src/app/models/user.model';

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

  passNrVal: boolean = false;

  alertError = false;
  errMessage = '';

  succValue = false;
  constructor(public loginservice: LoginService,  public db: AngularFireDatabase) { }

  ngOnInit() { }

  createUserWithEmailAndPassword() {
    if (this.password.length >= 8){
      this.passNrVal = false;
    }
    if (this.password.length < 8){
      this.passNrVal = true;
    }
    if (this.password.length < 1){
      this.passNrVal = false;
    }

    if (this.email == null || this.password == null) {
      this.alertError = true;
      this.errMessage = 'Date incomplete';
    } else {
      this.loginservice.createUserWithEmailAndPassword(this.email, this.password)
        .then(sucess => {
          this.userCreatedSucess = 1;
          this.succValue = true;
          const user: User = {
            email: this.email,
            fullName: this.fullname,
            userRole: 'user',
          }
            ;
          this.db.list('/users').push(user);
          setTimeout(() => {
            this.db.list('/users').valueChanges().subscribe(results => {
              console.log(results);
            });
          }, 1000);

        })
        .catch(error => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          if (error.message.includes('already in use') === true) {
            this.alertError = true;
            this.errMessage = error.message;
          }

          this.userCreatedSucess = 2;
        });
    }
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
    if (this.password.length == 0 ){
      this.passNrVal = false;
    }
  }

  onKeyFullName(event: any) { // without type info
    this.fullname = event.target.value;
    this.alertError = false;
    this.succValue = false;
  }
}
