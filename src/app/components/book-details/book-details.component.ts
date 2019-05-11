import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';
import { Book } from 'src/app/models/book.model';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  constructor(public dashboardService: DashboardService) { }

  books: Book[];

  ngOnInit() {
    this.dashboardService.getBooks().subscribe( list => {
      this.books = list;
    });
  }

}
