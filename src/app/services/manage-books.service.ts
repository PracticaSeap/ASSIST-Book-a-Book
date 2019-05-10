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

}
