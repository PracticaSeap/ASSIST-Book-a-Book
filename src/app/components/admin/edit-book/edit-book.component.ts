import { Component, OnInit, ApplicationModule } from '@angular/core';
import { AddBookService } from 'src/app/services/add-book.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { Book } from 'src/app/models/book.model';
// import { FirebaseObjectObservable } from 'angularfire2/database-deprecated'
import { ActivatedRoute, Router } from "@angular/router";
import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseService } from 'src/app/services/firebase.service';
import { BookDetailsComponent } from '../../book-details/book-details.component';
import { Title } from '@angular/platform-browser';
import { database } from 'firebase';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {
  bookList: Book[];
  bookKey;
  id: number;
  title: string;
  author: string;
  description: string;
  isbn: string;
  category: string;
  tag: string;
  image: string;
  is_borrowed: boolean;
  number_of_pages: number;
  virtual_book: string;
  addBookForm: FormGroup;
  book: Book;

  is_succeful: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private firebaseService: FirebaseService,
    private fb: FormBuilder,
    private loginService: LoginService) {

    this.addBookForm = this.fb.group({
      id: this.fb.control(''),
      title: this.fb.control('', Validators.required),
      author: this.fb.control('', Validators.required),
      isbn: this.fb.control('', Validators.required),
      description: this.fb.control('', Validators.required),
      category: this.fb.control('', Validators.required),
      tag: this.fb.control(''),
      virtual_book: this.fb.control('', Validators.required),
      is_borrowed: this.fb.control(false, Validators.required),
      image: this.fb.control(''),
      number_of_pages: this.fb.control('', Validators.required),
    });
    { }
  }
  
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.bookKey = params.get('id');
      this.firebaseService.getBookDetails(this.bookKey).subscribe(item => {
        const book = item as Book;
        this.title = book.title;
        this.author = book.author;
        this.description = book.description;
        this.isbn = book.isbn;
        this.number_of_pages = book.number_of_pages;
        this.category = book.category;
        this.is_borrowed = book.is_borrowed;
        this.virtual_book = book.virtual_book;
      });
    });
    this.loginService.loggedUser.subscribe(loggedUser =>{
      loggedUser;
     if (!loggedUser){
       this.router.navigate(['/login']);
     }
     if (loggedUser.userRole != 'admin'){
       this.router.navigate(['/dashboard']);
     }
   });
  }

  submitEdit() {
    const book = {
      author: this.author,
      title: this.title,
      description: this.description,
      isbn: this.isbn,
      category: this.category,
      is_borrowed: this.is_borrowed,
      number_of_pages: this.number_of_pages,
      virtual_book: this.virtual_book,
    };

    this.firebaseService.updateBook(this.bookKey, book).then( result => {
      this.is_succeful = true;
      this.showMessage();
    });
  }

  showMessage(){
    if (this.is_succeful==true){
    setTimeout(()=>{this.is_succeful=false}, 3000);
    }
  }

  redirect(){
    this.router.navigate(['/dashboard'])
  }
}
