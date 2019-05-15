import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book.model';
import { FormControl } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/database';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NgForm } from '@angular/forms'
import { AddBookService } from 'src/app/services/add-book.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
// export class FormFieldOverviewExample {}
export class AddBookComponent implements OnInit {
  public addBookApi: AddBookService;

  virtual_book = 'PhisicalBook';
  // bookType = 'PhisicalBook';
  public book: Book;
  addBook: FormGroup;
  // form: FormGroup;
  private books;
  allBooks: any;
  constructor(public db: AngularFireDatabase,
    private fb: FormBuilder) {
    this.db.list('/books').valueChanges().subscribe(books => {
      this.books = books;
      this.book = {
        id: this.books.length,
        title: '',
        author: '',
        isbn: '',
        description: '',
        category: '',
        tag: '',
        image: '',
        is_borrowed: false,
        number_of_pages: 0,
        virtual_book: '',
      }
    });

    this.addBook = this.fb.group({
      title: this.fb.control('', Validators.required),
      author: this.fb.control('', Validators.required),
      isbn: this.fb.control('', Validators.required),
      description: this.fb.control('', Validators.required),
      category: this.fb.control('', Validators.required),
      tag: this.fb.control('', Validators.required),
      virtual_book: this.fb.control('', Validators.required),
      status: this.fb.control('', Validators.required),
      image: this.fb.control('', Validators.required),
      is_borrowed: this.fb.control('', Validators.required) ,
      number_of_pages: this.fb.control('', Validators.required),
    });

    //o alta metoda a celei precedente

    // this.addBook = new FormGroup({
    //   title: new FormControl('', Validators.required),
    //   author: new FormControl('', Validators.required),
    //   isbn: new FormControl('', Validators.required),
    //   number_of_pages: new FormControl('', Validators.required),
    //   category: new FormControl('', Validators.required),
    //   tag: new FormControl('', Validators.required),
    //   virtual_book: new FormControl('', Validators.required),
    //   status: new FormControl('', Validators.required),
    //   image: new FormControl('', Validators.required),
    //   description: new FormControl('', Validators.required),
    // });

  }

  ngOnInit() {
    // this.addBookApi.GetBookList();
    this.addBook;
  }

  onSubmit(value) {
    console.log("form book :", this.addBook.value)
    console.log("Books :", this.books.value)
    this.books.push(this.addBook)
  }
}





