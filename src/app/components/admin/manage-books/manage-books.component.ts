import { Component, OnInit } from '@angular/core';
import { ManageBooksService } from 'src/app/services/manage-books.service';
import { browser } from 'protractor';

@Component({
  selector: 'app-manage-books',
  templateUrl: './manage-books.component.html',
  styleUrls: ['./manage-books.component.css']
})
export class ManageBooksComponent implements OnInit {
  overduebooks;
  borrowedbooks;
  allBooks;
  constructor(public bookManagerService: ManageBooksService) { }

  ngOnInit() {
   
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
