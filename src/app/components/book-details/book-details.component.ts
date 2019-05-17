import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';
import { Book } from 'src/app/models/book.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  constructor(public dashboardService: DashboardService, private route: ActivatedRoute) { }

  public bookId;

  books: Book[];

  ngOnInit() {
    let id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.bookId = id;
  }
}
