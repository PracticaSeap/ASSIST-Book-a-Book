import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book.model';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-my-books',
  templateUrl: './my-books.component.html',
  styleUrls: ['./my-books.component.css']
})
export class MyBooksComponent implements OnInit {

  books: Book[];
  nr = 10;

  constructor(public dashboardService: DashboardService) { }

  ngOnInit() {
    this.dashboardService.getBooks().subscribe( list => {
      this.books = list;
    });
  }

  loadMore(){
    this.nr += 10;
  }

}
