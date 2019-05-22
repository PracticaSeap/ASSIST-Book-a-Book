import { Injectable } from '@angular/core';
import { Book } from '../models/book.model';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';  // Firebase modules for Database, Data list and Single object
// import { FirebaseObjectObservable, FirebaseListObservable } from "angularfire2/database"; 

@Injectable({
  providedIn: 'root'
})
export class AddBookService{
  // books: FirebaseListObservable<any[]>; ; //from Firebase
  // bookDetails: FirebaseObjectObservable<any>; //from Firebase
  public book: Book;
  booksRef: AngularFireList<any>;    // Reference to Student data list, its an Observable
  bookRef: AngularFireObject<any>;   // Reference to Student object, its an Observable too
  constructor(private db: AngularFireDatabase) { }
  // Create Student
  public AddBook(book: Book) {
    this.booksRef.push({
      title: book.title,
      id: book.id,
      author: book.author,
      isbn: book.isbn,
      description: book.description,
      category: book.category,
      number_of_pages: book.number_of_pages,
      virtual_book: book.virtual_book,
    })
  }
  // Fetch Single Student Object
  //  public GetBook(id: string) {
  //   this.bookRef = this.db.object('students-list/' + id);
  //   console.log("Am fost pe aici")
  //   return this.bookRef;
  //   }
  //   // Fetch Students List
  //   public GetBookList() {
  //     console.log("Am fost pe aici2")
  //   this.booksRef = this.db.list('students-list');
  //   return this.booksRef;
  //   }  
  
  // addBook(bookDetails){
  //   var filteredBook = JSON.parse(JSON.stringify(bookDetails)); //removes the undefined fields
  //   console.log('Filtered Book - ',filteredBook);
  //   return this.books.push(filteredBook);
  // }

}
