import { Component, OnInit } from '@angular/core';
import { AddBookService } from 'src/app/services/add-book.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/database';
import { Book } from 'src/app/models/book.model';



@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {
  virtual_book = 'PhisicalBook';
  selected = 'Available'; // pentru a selecta o optiune directa
  public book: Book;
  editBookForm: FormGroup;
  private booksLength;
  allBooks: any;
  constructor(public db: AngularFireDatabase, private fb: FormBuilder) {
    this.db.list('/books').valueChanges().subscribe(books => {
      this.booksLength = books.length;
    });
    
    this.editBookForm = this.fb.group({
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

  onSubmit(value: Book):void {
    console.log('form book :', this.editBookForm.value);
    console.log('Books :', this.booksLength.value);
    this.editBookForm.value.id = this.booksLength;
    // this.db.list('/books').push(value);
    // this.editBookForm.reset();
  
  }
}
