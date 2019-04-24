import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase  } from '@angular/fire/database';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  items: Observable<any[]>;
  constructor(db: AngularFireDatabase) {
    console.log('here');
    this.items = db.list('/users').valueChanges();
  }
}
