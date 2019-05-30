import { Component, OnInit } from '@angular/core';
import { ManageBooksService } from 'src/app/services/manage-books.service';
import { HistoryEntry } from 'src/app/models/history.model';
import { Book, BookHistory } from 'src/app/models/book.model';
import { User } from 'src/app/models/user.model';
import { LoginService } from 'src/app/services/login.service';
import { debug } from 'util';
import { DashboardService } from 'src/app/services/dashboard.service';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-books',
  templateUrl: './manage-books.component.html',
  styleUrls: ['./manage-books.component.css']
})
export class ManageBooksComponent implements OnInit {
  // variabile pentru a prelua date despre carte
 
  // books: Book[];
  // bookList: AngularFireList<any>;
  // filtredBooks: Book[];
  // booksKey: [];
  //restul de variabile pentru celelalte functii
  booksHistory: HistoryEntry[];
  allBooksByKey: Book[];
  overdueBooks = [];
  borrowedBooks = [];
  allUsersByKey = {};
  history: History[];
  constructor( 
    private router: Router,
    public bookManagerService: ManageBooksService, 
    public loginService: LoginService,
    public db: AngularFireDatabase) { }

  ngOnInit() {
    this.loginService.usersByKey.subscribe(usersByKey => {
      this.allUsersByKey = usersByKey;
      // console.log(usersByKey);
      this.getBooksHistory();
    } );
    this.bookManagerService.booksByKey.subscribe(books => {
      this.allBooksByKey = books;
    });
    this.bookManagerService.history.subscribe(history => {
      this.booksHistory = history;
      this.getBooksHistory();
      console.log("booksHistory");
    });
  
  }

  getBooksHistory() {
    if (!this.booksHistory || !this.booksHistory.length || !Object.entries(this.allUsersByKey).length) {
      return;
    }
    this.overdueBooks = [];
    this.borrowedBooks = [];

    // get books that have no return date set - they were not returned
    const borrowedBooks = this.booksHistory.filter(book => !book.returnDate);
    borrowedBooks.forEach( entry => {
      const book: BookHistory = this.allBooksByKey[entry.bookKey];
      book.dueDate = entry.dueDate;
      book.initialDate = entry.initialDate;
      book.returnDate = entry.returnDate;
      book.key = entry.bookKey;
      book.userFullName = entry.userKey
      console.log("FullName" + book.userFullName);

      //debugger;
      if (entry.userKey && this.allUsersByKey[entry.userKey]) { 
        book.userFullName = this.allUsersByKey[entry.userKey].fullName;
      } else {
        book.userFullName = 'User key missing in db';
      }

      let todayDate = this.getTodayDate();
      // console.log("Due date " + book.dueDate + " " + book.title);
      // console.log("data de azi " + todayDate);
      if (this.getDateFromString(book.dueDate) >= todayDate) {
        this.borrowedBooks.push(book);
      } else {
        // console.log("Cartea este: " + book.dueDate + " " + book.key);
        this.overdueBooks.push(book);
      }
    });
  }

  getDateFromString(date) {
    const from = date.split('/');
    return new Date(from[2], from[1] - 1, from[0]);
  }

  getTodayDate() {
    const q = new Date();
    const m = q.getMonth();
    const d = q.getDate();
    const y = q.getFullYear();
    return new Date(y, m, d);
  }

  dateToString(date) {
    let month = (date.getMonth() + 1).toString();
    let day = (date.getDate()).toString();
    const year = date.getFullYear();
    month = (month.length < 2 ? '0' + month : month);
    day = (day.length < 2 ? '0' + day : day);
    return `${day}/${month}/${year}`;
  }

  goToDetails(bookKey){
    this.router.navigate(['/book-details/' + bookKey]);
  }

}
