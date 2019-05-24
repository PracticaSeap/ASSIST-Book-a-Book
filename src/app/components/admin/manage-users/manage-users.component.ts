import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {
  filteredUsers: User[];
  // user: User[];
  users: User[];
  // options: string[] = [];
  // options1: string[] = [];
  // options2: string[] = [];
  filteredOptions: string[] = [];  
  lungime: number;
  constructor(
    public db: AngularFireDatabase,
  ) { }

  ngOnInit() {
    this.getUsers().subscribe( list => {
      this.users = this.processUserData(list);
      this.filteredUsers = this.users;
      // this.users = this.user;
      this.lungime = this.users.length
      // this.options = this.filteredUsers.map(user => user.fullName);
      // // this.filteredOptions = this.options;
      // this.options1 = this.filteredUsers.map(user => user.email);
      // this.options2 = this.filteredUsers.map(user => user.userRole);

      // console.log(this.options)
      // console.log(this.options1)
      // console.log(this.options2)

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
      users.push(newUser);
    });
    return users;
  }

}
