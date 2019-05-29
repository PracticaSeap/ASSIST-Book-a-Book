import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';
import { Book } from 'src/app/models/book.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  constructor(public dashboardService: DashboardService, private firebaseService: FirebaseService, private route: ActivatedRoute, private router: Router) { }

  public bookId;

  book: Book;

  descr = 1;
  key;

  ngOnInit() {
    this.key = this.route.snapshot.paramMap.get('id');

    this.dashboardService.getBook(this.key).subscribe( book => {
      this.book = book as Book;
    });
  }

  borrowBook() {
    this.router.navigate(["/borrow-book/", this.key]);
  }

  returnBook(){
    const book = {
      is_borrowed: 'false',
    }
    this.firebaseService.updateBook(this.key, book);
  }


  Change_to_rec(){
    if (this.descr == 1) this.descr += 1;
  }

  Change_to_desc(){
    if (this.descr == 2) this.descr -= 1;
  }

}
