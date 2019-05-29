<<<<<<< HEAD
import { BookDetailsComponent } from "./../../book-details/book-details.component";
import { Book } from "./../../../models/book.model";
import { Component, OnInit, Input, AfterViewInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { DashboardService } from "src/app/services/dashboard.service";
import { Key } from "protractor";
import { ManageBooksService } from "src/app/services/manage-books.service";
import { AngularFireDatabase } from "@angular/fire/database";
=======
import { Book } from './../../../models/book.model';
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DashboardService } from 'src/app/services/dashboard.service';
import { ManageBooksService } from 'src/app/services/manage-books.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { HistoryEntry } from 'src/app/models/history.model';
>>>>>>> 0ecb8c7cea308caf4a0d430feb9d6c2c3e5a3b86

@Component({
  selector: "app-dashboard-book",
  templateUrl: "./dashboard-book.component.html",
  styleUrls: ["./dashboard-book.component.css"]
})
export class DashboardBookComponent implements OnInit {
  @Input() inputBook: Book;
  booksHistory: History[];
  books: Book[];
  dueDate;

  constructor(
    private router: Router,
    public dashboardService: DashboardService,
    private route: ActivatedRoute,
    public bookManagerService: ManageBooksService,
    private db: AngularFireDatabase
  ) {}

  ngOnInit() {
    this.db
<<<<<<< HEAD
      .list("/history")
=======
      .list('/history')
>>>>>>> 0ecb8c7cea308caf4a0d430feb9d6c2c3e5a3b86
      .valueChanges()
      .subscribe(entries => {
        console.log(entries);
        const histories = entries.filter(
<<<<<<< HEAD
          element => this.inputBook.key === element.bookKey
        );
        console.log("333", histories);
        if (histories.length > 0) {
          this.dueDate = histories[histories.length - 1].dueDate;
=======
          element => this.inputBook.key === (element as HistoryEntry).bookKey
        );
        console.log('333', histories);
        if (histories.length > 0) {
          this.dueDate = (histories[histories.length - 1] as HistoryEntry).dueDate;
>>>>>>> 0ecb8c7cea308caf4a0d430feb9d6c2c3e5a3b86
          console.log(this.dueDate);
        }
      });
  }

  onSelect() {
    this.router.navigate(["/book-details/", this.inputBook.key]);
  }

  onSelectBorrow() {
<<<<<<< HEAD
    this.router.navigate(["/borrow-book/", this.inputBook.key]);
=======
    this.router.navigate(['/borrow-book/', this.inputBook.key]);
>>>>>>> 0ecb8c7cea308caf4a0d430feb9d6c2c3e5a3b86
  }
}
