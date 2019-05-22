import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase  } from '@angular/fire/database';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor() {}
}
