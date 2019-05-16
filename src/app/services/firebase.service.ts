import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from '@angular/fire/database';
import { Book } from 'src/app/models/book.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  books: AngularFireList <any[]> ;
  bookDetails: AngularFireObject <any>;

  constructor(public db: AngularFireDatabase) {
  }
  getBookDetails(id){
    this.bookDetails = this.db.object('/books'+id) as AngularFireObject<Book>
    return this.bookDetails
  }

  updateBook(id, bookDetails){
    var filteredBook = JSON.parse(JSON.stringify(bookDetails)); //removes the undefined fields
    return this.books.update(id,filteredBook);
  }

}