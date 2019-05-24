import { Component, OnInit, ViewChild } from '@angular/core';
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
export class AddBookComponent implements OnInit {
  public addBookApi: AddBookService;
  @ViewChild('form') form;
  virtual_book = 'PhisicalBook';
  public book: Book;
  addBookForm: FormGroup;
  private booksLength;
  allBooks: any;
  is_succeful: boolean = false;
  constructor(public db: AngularFireDatabase, private fb: FormBuilder) {
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
      is_borrowed: this.fb.control(false, Validators.required),
      image: this.fb.control(''),
      number_of_pages: this.fb.control('', Validators.required),
    });

  }

  ngOnInit() { }

  onSubmit(value: Book): void {
    console.log('form book :', this.addBookForm.value);
    console.log('Books :', this.booksLength.value);
    this.addBookForm.value.id = this.booksLength;
    this.db.list('/books').push(value);
    this.form.resetForm();
    this.is_succeful = true;
    this.showMessage()
  }

  showMessage(){
    if (this.is_succeful = true){
    setTimeout(()=>{this.is_succeful=false}, 3000);
    }
  }
}





