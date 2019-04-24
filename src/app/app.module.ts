import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { RouterModule } from '@angular/router';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule, AngularFireDatabase} from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { appRoutes } from './app.routes';
import { LoginComponent } from './components/main-login/login/login.component';
import { SignUpComponent } from './components/main-login/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/main-login/forgot-password/forgot-password.component';
import { ManageBooksComponent } from './components/admin/manage-books/manage-books.component';
import { ManageUsersComponent } from './components/admin/manage-users/manage-users.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddBookComponent } from './components/admin/add-book/add-book.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { MyBooksComponent } from './components/my-books/my-books.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { HeaderBarComponent } from './components/header-bar/header-bar.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    ManageBooksComponent,
    ManageUsersComponent,
    DashboardComponent,
    AddBookComponent,
    BookDetailsComponent,
    MyBooksComponent,
    MyAccountComponent,
    HeaderBarComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    // AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    // AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    // AngularFireStorageModule, // imports firebase/storage only needed for storage features,
    AngularFireDatabaseModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
