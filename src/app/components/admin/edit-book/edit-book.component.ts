import { Component, OnInit, ApplicationModule } from '@angular/core';
import { AddBookService } from 'src/app/services/add-book.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { Book } from 'src/app/models/book.model';
// import { FirebaseObjectObservable } from 'angularfire2/database-deprecated'
import { ActivatedRoute, Router } from "@angular/router";
import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {
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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private firebaseService: FirebaseService)

    //  {  this.id = this.route.snapshot.params['id'];
    // this.firebaseService.getBookDetails(this.id).valueChanges().subscribe(book => {
    //   this.title = book.title;
    //   this.author = book.author;
    //   this.description = book.description;
    //   this.isbn = book.isbn;
    //   this.number_of_pages = book.number_of_pages;
    //   this.category = book.category;
    //   this.is_borrowed = book.is_borrowed;
    //   this.virtual_book = book.virtual_book;
    // }
    {}


  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.title = params.get("title")
      console.log(this.title)
    })
  }

  // submitEdit() {
  //   let book = {
  //     author: this.author,
  //     title: this.title,
  //     description: this.description,
  //     isbn: this.isbn,
  //     category: this.category,
  //     is_borrowed: this.is_borrowed,
  //     number_of_pages: this.number_of_pages,
  //     virtual_book: this.virtual_book,
  //   }

  //   this.firebaseService.updateBook(this.id, book);
  //   this.router.navigate(['/books'])
  //  }




}



