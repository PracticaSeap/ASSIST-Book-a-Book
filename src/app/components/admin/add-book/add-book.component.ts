import { Component, OnInit } from '@angular/core';
// import { NgModule } from '@angular/core';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
// export class FormFieldOverviewExample {}
  export class AddBookComponent implements OnInit {
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
