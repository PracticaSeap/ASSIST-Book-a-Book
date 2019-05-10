import { Book } from './../../../models/book.model';
import { Component, OnInit, Input } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';

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
