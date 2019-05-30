import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Book } from 'src/app/models/book.model';
import { AddBookService } from 'src/app/services/add-book.service';
import { HistoryEntry } from 'src/app/models/history.model';
import { FormControl } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ManageBooksService } from 'src/app/services/manage-books.service';
import { User } from 'src/app/models/user.model';


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
  user: User[];
  filteredUsers: User[];
  myControl = new FormControl();

  // acest string ar trebui populat cu users
  // options: string[] = ['John Lee', 'Antonio Banderas', 'Van Damme'];
  options = [];
  filteredOptions: string[] = [];
  usersList: AngularFireList<any>;

  public borrow: HistoryEntry;
  borrowbookForm: FormGroup;
  allBooks: any;
  constructor(
    public db: AngularFireDatabase,
    private fb: FormBuilder,
    private firebaseService: FirebaseService,
    public route: ActivatedRoute,
    public manageBooksService: ManageBooksService,
    private router: Router
  ) {
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
          this.author = book.author;
          this.description = book.description;
          if (book.is_borrowed.toString() === 'true') {
            this.is_borrowed =  true;
          } else {
            this.is_borrowed = false;
          }
      });
    });

    // functie pentru users
    this.getUsers().subscribe( list => {
      this.user = this.processUserData(list);
      this.filteredUsers = this.user;
      this.options = this.filteredUsers; // .map(user => user.fullName);
      this.filteredOptions = this.options;
    });


  }

  // functie folosita in inputBox pentru a cauta numele
  public filter(event) {
    const filterValue = event.value.toLowerCase();
    this.filteredOptions = this.options.filter(option => option.fullName.toLowerCase().indexOf(filterValue) === 0);
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

    // functie pentru editare is_borrowed
    const book = {
      is_borrowed: true,
    };

    this.firebaseService.updateBook(this.bookKey, book);
    this.router.navigate(['/dashboard']);
  }

  showMessage() {
    if (this.isSuccessful === true) {
    setTimeout(() => {this.isSuccessful = false; }, 3000);
    }
  }

  // functie pentru a prelua lista de users
  getUsers() {
    this.usersList = this.db.list('/users');
    return this.usersList.snapshotChanges();
  }
  processUserData(listOfUsers): User[] {
    const users: User[] = [];
    listOfUsers.forEach(user => {
      const newUser = user.payload.val();
      newUser.key = user.key;
      users.push(newUser);
    });
    return users;
  }
  filterUser(value: string) {
    this.filteredUsers = this.user.filter(user =>
       user.email.toLowerCase().includes(value.toLowerCase()) ||
       user.fullName.toLowerCase().includes(value.toLowerCase())
       );
  }
}
