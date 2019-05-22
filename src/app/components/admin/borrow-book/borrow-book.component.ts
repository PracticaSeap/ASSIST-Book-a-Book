import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/database';
import { Book } from 'src/app/models/book.model';
import { AddBookService } from 'src/app/services/add-book.service';
import { HistoryEntry } from 'src/app/models/history.mode';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { FirebaseService } from 'src/app/services/firebase.service';
import { ActivatedRoute } from '@angular/router';
import { ManageBooksService } from 'src/app/services/manage-books.service';
// import { userInfo } from 'os';

@Component({
  selector: 'app-borrow-book',
  templateUrl: './borrow-book.component.html',
  styleUrls: ['./borrow-book.component.css']
})
export class BorrowBookComponent implements OnInit {
  public addBookApi: AddBookService;
  bookKey;
  @ViewChild('form') form;
  is_borrowed;
  title = '';
  author = '';
  description = '';
  initialDate;
  dueDate;
  userKey;

  isSuccessful = false;
  history: HistoryEntry;
  myControl = new FormControl();

  // acest string ar trebui populat cu users
  options: string[] = ['John Lee', 'Antonio Banderas', 'Van Damme'];
  filteredOptions: Observable<string[]>;

  public borrow: HistoryEntry;
  borrowbookForm: FormGroup;
  allBooks: any;
  constructor(
    public db: AngularFireDatabase,
    private fb: FormBuilder,
    private firebaseService: FirebaseService,
    public route: ActivatedRoute,
    public manageBooksService: ManageBooksService,
    private ngZone: NgZone, ) {

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
          console.log(item);
          const book = item as Book;
          this.title = book.title;
          console.log(this.title);
          this.author = book.author;
          console.log(this.author);
          this.description = book.description;
          console.log(this.description);
          console.log(book.is_borrowed);
          if (book.is_borrowed.toString() === 'true') {
            this.is_borrowed =  true;
          } else {
            this.is_borrowed = false;
          }
      });
    });

    // functie pentru imputBoox de cautat
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );

  }

  // functie folosita in inputBox pentru a cauta numele
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  dateToString(date) {
    let month = (date.getMonth() + 1).toString();
    let day = (date.getDate()).toString();
    const year = date.getFullYear();
    month = (month.length < 2 ? '0' + month : month);
    day = (day.length < 2 ? '0' + day : day);
    return `${day}/${month}/${year}`;
  }

  onSubmit(value: History): void {
    const history = {
      bookKey: this.bookKey,
      initialDate: this.dateToString(this.initialDate),
      dueDate: this.dateToString(this.dueDate),
      returnDate: '',
      userKey: this.userKey,
    };

    this.db.list('/history').push(history).then(result => {
      this.isSuccessful = true;
      this.showMessage();
    });
  }
  showMessage() {
    if (this.isSuccessful === true) {
    setTimeout(() => {this.isSuccessful = false;}, 3000);
    }
  }
}
