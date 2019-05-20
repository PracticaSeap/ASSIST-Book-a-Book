import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(public db: AngularFireDatabase) {}

  getBookDetails(key) {
    return this.db.object('/books/' + key).valueChanges();
  }

  updateBook(id, bookDetails) {
    return this.db.list('/books').update(id, bookDetails);
  }
}
