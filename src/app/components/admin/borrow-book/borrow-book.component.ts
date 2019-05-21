import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/database';
import { Book } from 'src/app/models/book.model';
import { AddBookService } from 'src/app/services/add-book.service';
import { HistoryEntry } from 'src/app/models/history.mode';
import {Observable} from 'rxjs';
import {FormControl} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import { User } from 'firebase';
import { extractDirectiveDef } from '@angular/core/src/render3/definition';
import { FirebaseService } from 'src/app/services/firebase.service';
import { ActivatedRoute, Router } from '@angular/router';
// import { userInfo } from 'os';

@Component({
  selector: 'app-borrow-book',
  templateUrl: './borrow-book.component.html',
  styleUrls: ['./borrow-book.component.css']
})
export class BorrowBookComponent implements OnInit {
  public addBookApi: AddBookService;
  bookKey;
  is_borrowed;
  title;
  author;
  description;
  initialDate;
  dueDate;
  userKey;
  
  // userList: {}[];
  myControl = new FormControl;

  // acest string ar trebui populat cu users
  options: string[] = ['John Lee', 'Antonio Banderas', 'Van Damme'];
  filteredOptions: Observable <string[]>;

  // @ViewChild('form') form;
  public borrow: HistoryEntry;
  borrowbookForm: FormGroup;
  // private booksLength;
  allBooks: any;
  constructor(
    public db: AngularFireDatabase, 
    private fb: FormBuilder,
    private firebaseService: FirebaseService,
    public route: ActivatedRoute,) {
  
    this.borrowbookForm = this.fb.group({
      returnDate: this.fb.control('', Validators.required),
      dueDate: this.fb.control('', Validators.required),
      userKey: this.fb.control('', Validators.required),
      initialDate: this.fb.control('', Validators.required),
      bookKey: this.fb.control('', Validators.required),
      title: this.fb.control('', Validators.required),
      author: this.fb.control('', Validators.required),
      description: this.fb.control('', Validators.required),
    });

  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.bookKey = params.get('id');
    this.firebaseService.getBookDetails(this.bookKey).subscribe(item => {
      const book = item as Book;
      this.title = book.title;
      console.log(this.title);
      this.author = book.author;
      console.log(this.author);
      this.description = book.description;
      console.log(this.description);
      this.is_borrowed = book.is_borrowed;
      console.log(this.is_borrowed);

      });
    });
    //functie pentru imputBoox de cautat
    this.filteredOptions = this.myControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value))
    );
   
  }

  //functie folosita in inputBox pentru a cauta numele
  private _filter(value: string): string[] {
  const filterValue = value.toLowerCase();
  return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
 

  // getUsersDetails(){
  //   return this.db.object('/books').valueChanges();
  // }

  onSubmit(value: History): void {
    console.log('form book :', this.borrowbookForm.value);
    // console.log('Books :', this.booksLength.value);
    // this.borrowbookForm.value.id = this.booksLength;
    this.db.list('/history').push(value);
    // this.form.resetForm();
  }
}