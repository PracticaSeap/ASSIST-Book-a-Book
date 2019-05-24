import { Book } from 'src/app/models/book.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(public db: AngularFireDatabase) { }

  bookList: AngularFireList<any>;

  getBooks(){
    this.bookList = this.db.list('/books');
    return this.bookList.snapshotChanges();
  }

  processBooksData(listOfBooks): Book[] {
    const books: Book[] = [];
    listOfBooks.forEach(book => {
      const newBook = book.payload.val();
      newBook.key = book.key;
      books.push(newBook);
    });
    return books;
  }

  getBook(key){
    return this.db.object('/books/' + key).valueChanges();
  }

}
