import { Book } from 'src/app/models/book.model';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { HistoryEntry } from '../models/history.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(public db: AngularFireDatabase) { 
  }

  bookList: AngularFireList<any>;
  bookHistoryList: AngularFireList<any>;
  historyKeyValue: {[ key: string ]: History} = {};

  getBooks(){
    this.bookList = this.db.list('/books');
    return this.bookList.snapshotChanges();
  }

  getBooksHistory(){
    this.bookHistoryList = this.db.list('/history');
    return this.bookHistoryList.valueChanges();
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

  processHistoryData(listOfhistory): History[] {
    const history: History[] = [];
    listOfhistory.forEach(history => {
      const newhistory = history.payload.val();
      newhistory.key = history.key;
      this.historyKeyValue[history.key] = newhistory;
    });
    console.log(this.historyKeyValue)
    return history;
  }


  getBook(key){
    return this.db.object('/books/' + key).valueChanges();
  }
  

}
