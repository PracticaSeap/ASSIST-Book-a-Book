import { Book } from './../../../models/book.model';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-book',
  templateUrl: './dashboard-book.component.html',
  styleUrls: ['./dashboard-book.component.css']
})

export class DashboardBookComponent implements OnInit {

  @Input() inputBook: Book;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onSelect(){
    this.router.navigate(['/book-details', this.inputBook.id]);
  }


}
