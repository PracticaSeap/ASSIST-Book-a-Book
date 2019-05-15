import { Book } from './../../models/book.model';
import { DashboardService } from './../../services/dashboard.service';
import { Component, OnInit, Input } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public dashboardService: DashboardService, private router: Router) { }

  books: Book[];
  filteredBooks: Book[];

  ngOnInit() {
    this.dashboardService.getBooks().subscribe( list => {
      this.books = list;
      this.filteredBooks = this.books;
      console.log(this.books);
    });
  }

  filterBooks(value: string) {
    this.filteredBooks = this.books.filter(book =>
       book.title.toLowerCase().includes(value.toLowerCase()) ||
       book.author.toLowerCase().includes(value.toLowerCase()) ||
       book.isbn.toLowerCase().includes(value.toLowerCase())
  );

    if(this.filteredBooks.length == 0){
      this.filteredBooks = [];
    }
  }

  onSelect(book){
    this.router.navigate(['/book-details', book.id]);
  }
}
