import { Book } from './../../models/book.model';
import { DashboardService } from './../../services/dashboard.service';
import { Component, OnInit, Input } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private router: Router,
    public dashboardService: DashboardService,
    public loginService: LoginService
  ) { }

  books: Book[];
  filteredBooks: Book[];
  nr = 10;
  count = 0;
  user;

  ngOnInit() {
    this.loginService.loggedUser.subscribe(currentUser => {
      if (currentUser !== undefined) {
        if (currentUser === null) {
          this.router.navigate(['/login']);
        } else {
          this.user = currentUser;
        }
      }
    });

    this.dashboardService.getBooks().subscribe( list => {
      this.books = this.dashboardService.processBooksData(list);
      this.filteredBooks = this.books;
      this.count = this.books.length;
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
    if(this.nr > this.count){
      this.count = this.nr;
    }
  }
}
