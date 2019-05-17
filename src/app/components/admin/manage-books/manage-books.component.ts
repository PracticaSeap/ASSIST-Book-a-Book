import { Component, OnInit } from '@angular/core';
import { ManageBooksService } from 'src/app/services/manage-books.service';
import { browser } from 'protractor';
import { HistoryEntry } from 'src/app/models/history.mode';

@Component({
  selector: 'app-manage-books',
  templateUrl: './manage-books.component.html',
  styleUrls: ['./manage-books.component.css']
})
export class ManageBooksComponent implements OnInit {
  booksHistory;
  overduebooks;
  borrowedbooks;
  allBooks;
  constructor(public bookManagerService: ManageBooksService) { }

  ngOnInit() {
   
    this.bookManagerService.getHistory().subscribe(books=>{
      debugger;
      this.booksHistory = books.map(entry => {
        
         (entry as HistoryEntry).book_id
      });

      console.log(this.booksHistory);
    });
    this.bookManagerService.getbooks().subscribe(books=>{
      this.allBooks = books;
      console.log(this.allBooks);
    });
    this.bookManagerService.getbooks().subscribe(books=>{
      this.overduebooks= books;
      console.log(this.overduebooks);

    });
    this.bookManagerService.getbooks().subscribe(books=> {
      this.borrowedbooks = books;
      console.log(this.borrowedbooks);
    });
  }

}
