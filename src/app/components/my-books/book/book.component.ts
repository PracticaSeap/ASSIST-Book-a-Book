import { Component, OnInit, Input } from '@angular/core';
import { Book } from 'src/app/models/book.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  @Input() inputBook: Book;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onSelect(){
    this.router.navigate(['/book-details', this.inputBook.key]);
  }

}
