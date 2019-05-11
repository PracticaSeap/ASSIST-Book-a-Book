import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book.model';
import { FormControl } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/database';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NgForm } from '@angular/forms'

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
// export class FormFieldOverviewExample {}
export class AddBookComponent implements OnInit {
  virtual_book = 'PhisicalBook';
  // bookType = 'PhisicalBook';
  public book: Book;
  addBook: FormGroup;
  // form: FormGroup;
  private books;
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
          number_of_pages: 0,
          virtual_book: '',
        }
    });

    this.addBook =  this.fb.group({
      title: this.fb.control('', Validators.required),
      author: this.fb.control('', Validators.required),
      isbn: this.fb.control('', Validators.required),
      description: this.fb.control('', Validators.required),
      category: this.fb.control('', Validators.required),
      tag: this.fb.control('', Validators.required),
      virtual_book: this.fb.control('', Validators.required),
      status: this.fb.control('', Validators.required),
      image: this.fb.control('', Validators.required),
      number_of_pages: this.fb.control('', Validators.required),
    });

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

    // onSubmit(value){
    //   this.firebaseService.addBook(value)
    //   .then(
    //     res => {
    //       this.resetFields();
    //       this.router.navigate(['/home']);
    //     }
    //   )
  }
onSubmit(value){
  console.log("form book", this.addBook.value)
}

  // onSubmit(value) {
  //   return this.db.list('test').push({
      //     title: value.title,
      //     author: value.author,
      //     description: value.description,
      //     isbn: value.isbn,
  //   });

  // }
}





