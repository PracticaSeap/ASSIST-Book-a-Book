import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(public db: AngularFireDatabase) {
    // TBD
    // this.items = db.list('/users').valueChanges();
  }
  addBook(value){
    return this.db.list('test').push({
      title: value.title,
      author: value.author,
      description: value.description,
      isbn: value.isbn,
    });
  }
}