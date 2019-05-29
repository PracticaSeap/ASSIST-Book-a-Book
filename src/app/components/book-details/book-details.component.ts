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

  book: Book;

  descr = 1;

  ngOnInit() {
    const key = this.route.snapshot.paramMap.get('id');

    this.dashboardService.getBook(key).subscribe( book => {
      this.book = book as Book;
    });
  }


  Change_to_rec(){
    if (this.descr == 1) this.descr += 1;
  }

  Change_to_desc(){
    if (this.descr == 2) this.descr -= 1;
  }

}
