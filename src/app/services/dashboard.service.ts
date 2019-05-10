import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(public db: AngularFireDatabase) { }

  bookList: AngularFireList<any>;

  getBooks(){
    this.bookList = this.db.list('/books');
    return this.bookList.valueChanges();
  }

}
