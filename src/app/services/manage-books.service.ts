import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ManageBooksService {
  allbooks;
  borrowedbooks;

  constructor(public db: AngularFireDatabase) { }
  getbooks(){   
     return this.db.list('/books').valueChanges();
  }

  getHistory() {
    return this.db.list('/history').valueChanges();
  }

  getBookData(id:string){
    this.db.list('/books/id').valueChanges();
  };

}
