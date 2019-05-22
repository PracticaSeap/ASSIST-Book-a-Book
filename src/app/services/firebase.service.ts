import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from '@angular/fire/database';
import { Book } from 'src/app/models/book.model';
import { ConditionalExpr } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(public db: AngularFireDatabase) {}

  // constructor(public db: AngularFireDatabase) {}

  // getBookDetails(key) {
  //   return this.db.object('/books/' + key).valueChanges();
  // }

  // updateBook(id, bookDetails) {
  //   return this.db.list('/books').update(id, bookDetails);
  // }
  getBookDetails(key) {
    return this.db.object('/books/' + key).valueChanges();
  }

  updateBook(id, bookDetails) {
    return this.db.list('/books').update(id, bookDetails);
  }
}
