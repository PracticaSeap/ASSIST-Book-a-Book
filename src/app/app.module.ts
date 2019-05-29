import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { RouterModule } from '@angular/router';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
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
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { DashboardBookComponent } from './components/dashboard/dashboard-book/dashboard-book.component';

import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { MatInputModule, MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatRadioModule } from '@angular/material/radio';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import 'hammerjs';
import { EditBookComponent } from './components/admin/edit-book/edit-book.component';
import { BookComponent } from './components/my-books/book/book.component';
import { FooterBarComponent } from './components/footer-bar/footer-bar.component';
import { FilterPipe } from './filter.pipe';
import { RecommendationsComponent } from './components/book-details/recommendations/recommendations.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FirebaseService } from './services/firebase.service';
import { BorrowBookComponent } from './components/admin/borrow-book/borrow-book.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import {MatDialogModule} from '@angular/material/dialog';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

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
    DashboardBookComponent,
    EditBookComponent,
    BookComponent,
    FooterBarComponent,
    FilterPipe,
    RecommendationsComponent,
    BorrowBookComponent,
  ],
  imports: [
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatRadioModule,
    FormsModule,
    MatInputModule, MatTableModule, MatPaginatorModule, MatSortModule,
    NoopAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireDatabaseModule,
    AngularFontAwesomeModule,
    MatAutocompleteModule,
    MatDialogModule,

    NgbModule,
    BsDropdownModule.forRoot(),
   // AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
  ],
  providers: [MatNativeDateModule, FirebaseService],
  exports: [BsDropdownModule],

  bootstrap: [AppComponent]
})
export class AppModule { }


