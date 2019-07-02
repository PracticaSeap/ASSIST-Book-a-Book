import { Component, OnInit, ViewChild } from '@angular/core';
import { Book } from 'src/app/models/book.model';
import { FormControl } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/database';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AddBookService } from 'src/app/services/add-book.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  public addBookApi: AddBookService;
  @ViewChild('form') form;
  virtualBook = 'PhisicalBook';
  public book: Book;
  addBookForm: FormGroup;
  private booksLength;
  allBooks: any;
  isSucceful = false;
  constructor(
    public db: AngularFireDatabase,
    private fb: FormBuilder,
    private router: Router,
    public loginService: LoginService, ) {
    this.db.list('/books').valueChanges().subscribe(books => {
      this.booksLength = books.length;
    });

    this.addBookForm = this.fb.group({
      id: this.fb.control(''),
      title: this.fb.control('', Validators.required),
      author: this.fb.control('', Validators.required),
      isbn: this.fb.control('', Validators.required),
      description: this.fb.control('', Validators.required),
      category: this.fb.control('', Validators.required),
      tag: this.fb.control(''),
      virtual_book: this.fb.control('', Validators.required),
      is_borrowed: 'false',
      image: this.fb.control(''),
      number_of_pages: this.fb.control('', Validators.required),
    });

  }

  ngOnInit() {
    this.loginService.loggedUser.subscribe(currentUser => {
      if (currentUser !== undefined) {
        if (currentUser === null) {
          this.router.navigate(['/login']);
        }
        if (currentUser.userRole !== 'admin') {
          this.router.navigate(['/dashboard']);
        }
      }
    });
  }

  onSubmit(value): void {
    value.is_borrowed = 'false';
    console.log('form book :', this.addBookForm.value);
    console.log('Books :', this.booksLength.value);
    this.addBookForm.value.id = this.booksLength;
    this.db.list('/books').push(value);
    this.form.resetForm();
    this.isSucceful = true;
    this.showMessage();
  }

  showMessage() {
    if (this.isSucceful === true) {
      setTimeout(() => { this.isSucceful = false; }, 3000);
    }
  }

  redirect() {
    this.router.navigate(['/dashboard']);
  }
   setVirtualBook() {
    this.virtualBook = 'Virtual_book';
   }
   setPsihicalBook() {
    this.virtualBook = 'PhisicalBook';
   }
}





