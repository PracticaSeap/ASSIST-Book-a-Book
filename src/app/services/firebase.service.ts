import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from '@angular/fire/database';
import { Book } from 'src/app/models/book.model';
import { ConditionalExpr } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  books: AngularFireList <any> ;

  constructor(public db: AngularFireDatabase) {
  }
  // getBookDetails(id){
  //   this.bookDetails = this.db.object('/books'+id) as AngularFireObject<Book>
  //   console.log("book:" + this.bookDetails)
  //   return this.bookDetails
  // }

  getBookDetails(key){
    return this.db.object('/books/' + key).valueChanges();
  }


  updateBook(id, bookDetails){
    var filteredBook = JSON.parse(JSON.stringify(bookDetails)); //removes the undefined fields
    return this.books.update(id,filteredBook);
  }

}