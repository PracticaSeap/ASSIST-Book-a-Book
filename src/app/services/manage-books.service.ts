import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Book } from '../models/book.model';
import { HistoryEntry } from '../models/history.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManageBooksService {
  // keep al the books and histroy in one place  - it will auto update once there is a change in the application
  books: Subject<Book[]> = new Subject<Book[]>();
  booksByKey: Subject<any> = new Subject<any>();
  history: Subject<HistoryEntry[]> = new Subject<HistoryEntry[]>();
  booksKeyValue: {[ key: string ]: Book} = {};
  constructor(public db: AngularFireDatabase) {
    this.getBooks();
    this.getHistory();
  }

  getBooks() {
    this.db.list('/books').snapshotChanges().subscribe( books => {
      // add firebase key to each book
      const booksWithKey = this.processBooksData(books);
      this.books.next(booksWithKey);
      this.booksByKey.next(this.booksKeyValue);
    });
  }

  getHistory() {
    this.db.list('/history').valueChanges().subscribe( entries => {
      console.log(entries);
      this.history.next(entries as HistoryEntry[]);
    });
  }

  processBooksData(listOfBooks): Book[] {
    const books: Book[] = [];
    listOfBooks.forEach(book => {
      const newBook = book.payload.val();
      newBook.key = book.key;
      books.push(newBook);
      this.booksKeyValue[book.key] = newBook;
    });
    return books;
  }

  getBookData(id: string) {
    this.db.list('/books/id').valueChanges();
  }

}
