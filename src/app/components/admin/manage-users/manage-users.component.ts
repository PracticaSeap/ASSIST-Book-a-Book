import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {

  filteredUsers: User[];
  // firebaseService: FirebaseService;
  users: User[];
  filteredOptions: string[] = [];  
  lungime: number;
  userKey: string;

  constructor(
    public db: AngularFireDatabase,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getUsers().subscribe( list => {
      this.users = this.processUserData(list);
 
      this.lungime = this.users.length


    });
  }

  usersList: AngularFireList<any>;
  getUsers(){
    this.usersList = this.db.list('/users');
    return this.usersList.snapshotChanges();
  }

  processUserData(listOfUsers): User[] {
    const users: User[] = [];
    listOfUsers.forEach(user => {
      const newUser = user.payload.val();
      newUser.key = user.key;
      this.userKey = user.key;
      // console.log(user.key)

      //aveam o eroare in fiserul cu sign-up.component.ts
      users.push(newUser);
    });
    return users;
  }
  
  makeAdmin(){
    const user = {
      userRole: "admin",
    }
    this.updateUser(this.userKey, user);
  }

  updateUser(id, userDetails) {
    return this.db.list('/users').update(id, userDetails);
  }
  regularUser(){
    const user = {
      userRole: "user",
    }
    this.updateUser(this.userKey, user);
  }

  deletUser(){
    const id = this.userKey; 
    return this.db.list('/users').remove(id);
  }

  setKey(key){
   this.userKey = key;
 }
}
