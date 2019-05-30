import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book.model';
import { ManageBooksService } from 'src/app/services/manage-books.service';
import { HistoryEntry } from 'src/app/models/history.model';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-my-books',
  templateUrl: './my-books.component.html',
  styleUrls: ['./my-books.component.css']
})
export class MyBooksComponent implements OnInit {

  allBooksByKey: Book[];
  booksHistory: HistoryEntry[];
  nr = 10;
  user;
  books: Book[] = [];

  constructor(public bookManagerService: ManageBooksService,
    public loginService: LoginService) { }

  ngOnInit() {
    this.bookManagerService.booksByKey.subscribe(books => {
      this.allBooksByKey = books;
      this.getBooksHistory();
    });
    this.bookManagerService.history.subscribe(history => {
      this.booksHistory = history;
      this.getBooksHistory();
    });
    this.loginService.loggedUser.subscribe( currentUser => {
      this.user = currentUser;
      this.getBooksHistory();
    })
  }

  getBooksHistory() {
    if (!this.booksHistory || !this.booksHistory.length || !this.user) {
      return;
    }

    const myBooks = this.booksHistory.filter(book => book.userKey == this.user.key);

    
    myBooks.forEach(entry => {
      const book: Book = this.allBooksByKey[entry.bookKey];
      this.books.push(book);
    })

  
  }

  loadMore(){
    this.nr += 10;
  }

}
