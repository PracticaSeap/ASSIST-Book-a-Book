import { DashboardService } from './../../services/dashboard.service';
import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public dashboardService: DashboardService) { }
  books;
  ngOnInit() {
    this.dashboardService.getBooks().subscribe( list => {
      this.books = list;
      console.log(this.books);
    });
  }

}
