import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {
    bookType = 'PhisicalBook';
    constructor() { }
  
    ngOnInit() {
    }
  
    inputFile() {
      console.log("Buna ziua!");
      var elem = <HTMLDivElement>(document.createElement("Input"));
      elem.setAttribute("type", "file");
      document.body.appendChild(elem);
    }
  
  }
