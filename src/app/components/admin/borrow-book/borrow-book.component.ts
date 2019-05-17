import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/database';
import { Book } from 'src/app/models/book.model';
import { AddBookService } from 'src/app/services/add-book.service';
import { History } from 'src/app/models/history.mode';
import {Observable} from 'rxjs';
import {FormControl} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import { User } from 'firebase';
import { extractDirectiveDef } from '@angular/core/src/render3/definition';
// import { userInfo } from 'os';

@Component({
  selector: 'app-borrow-book',
  templateUrl: './borrow-book.component.html',
  styleUrls: ['./borrow-book.component.css']
})
export class BorrowBookComponent implements OnInit {
  public addBookApi: AddBookService;

  userList: {}[];
  myControl = new FormControl;
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable <string[]>;

  // @ViewChild('form') form;
  public borrow: History;
  borrowbookForm: FormGroup;
  // private booksLength;
  allBooks: any;
  constructor(public db: AngularFireDatabase, private fb: FormBuilder) {
    this.db.list('/books').valueChanges().subscribe(books => {
      // this.booksLength = books.length;
    });

    this.borrowbookForm = this.fb.group({
      lend_date: this.fb.control('', Validators.required),
      due_date: this.fb.control('', Validators.required),
      user_email: this.fb.control('', Validators.required),
      initial_date: this.fb.control('', Validators.required),
      book_id: this.fb.control('', Validators.required),

    });

  }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    this.extract();
   }
   
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
  extract(){
    this.getUsersDetails().subscribe(list => {
      this.userList = list,
      console.log("Trebuie sa mearga" + list)},
      )
      
  }

  getUsersDetails(){
    let users = this.db.list('/users');
    return users.valueChanges();
  }

  onSubmit(value: History): void {
    console.log('form book :', this.borrowbookForm.value);
    // console.log('Books :', this.booksLength.value);
    // this.borrowbookForm.value.id = this.booksLength;
    this.db.list('/history').push(value);
    // this.form.resetForm();
  }
}