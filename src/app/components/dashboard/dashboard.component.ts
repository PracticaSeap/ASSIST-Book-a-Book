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

  constructor(public dashboardService: DashboardService) { }

  books: Book[];
  filteredBooks: Book[];
  nr = 10;
  count = 0;

  ngOnInit() {
    this.dashboardService.getBooks().subscribe( list => {
      this.books = this.dashboardService.processBooksData(list);
      this.filteredBooks = this.books;
      
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

  loadMore(){
    this.nr += 10;
    this.count = this.books.length;
  }
}
