import { Book } from './../../../models/book.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-book',
  templateUrl: './dashboard-book.component.html',
  styleUrls: ['./dashboard-book.component.css']
})
export class DashboardBookComponent implements OnInit {
  @Input() inputBook: Book;
  constructor() { }

  ngOnInit() {
  }

}
