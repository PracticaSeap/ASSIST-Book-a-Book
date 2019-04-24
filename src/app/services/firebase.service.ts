import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(db: AngularFireDatabase) {
    // TBD
    // this.items = db.list('/users').valueChanges();
  }
}
