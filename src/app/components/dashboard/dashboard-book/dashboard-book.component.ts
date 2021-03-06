import { Book } from './../../../models/book.model';
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DashboardService } from 'src/app/services/dashboard.service';
import { ManageBooksService } from 'src/app/services/manage-books.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { HistoryEntry } from 'src/app/models/history.model';
import { User } from 'firebase';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-dashboard-book',
  templateUrl: './dashboard-book.component.html',
  styleUrls: ['./dashboard-book.component.css']
})
export class DashboardBookComponent implements OnInit {
  @Input() inputBook: Book;
  @Input() user: User;
  booksHistory: History[];
  books: Book[];
  dueDate;

  constructor(
    private router: Router,
    public dashboardService: DashboardService,
    private route: ActivatedRoute,
    public bookManagerService: ManageBooksService,
    private db: AngularFireDatabase,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    this.db
      .list('/history')
      .valueChanges()
      .subscribe(entries => {
        const histories = entries.filter(
          element => this.inputBook.key === (element as HistoryEntry).bookKey
        );
        if (histories.length > 0) {
          this.dueDate = (histories[histories.length - 1] as HistoryEntry).dueDate;
        }
      });
  }

  onSelect() {
    this.router.navigate(['/book-details/', this.inputBook.key]);
  }

  onSelectBorrow() {
    this.router.navigate(['/borrow-book/', this.inputBook.key]);
  }
}
