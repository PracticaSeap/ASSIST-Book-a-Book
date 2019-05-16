
import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/main-login/login/login.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { AddBookComponent } from './components/admin/add-book/add-book.component';
import { ManageBooksComponent } from './components/admin/manage-books/manage-books.component';
import { ForgotPasswordComponent } from './components/main-login/forgot-password/forgot-password.component';
import { SignUpComponent } from './components/main-login/sign-up/sign-up.component'
import { EditBookComponent } from './components/admin/edit-book/edit-book.component';
import { BorrowBookComponent } from './components/admin/borrow-book/borrow-book.component';


export const appRoutes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'book-details/:id', component: BookDetailsComponent },
    { path: 'add-book', component: AddBookComponent },
    { path: 'edit-book/:id', component: EditBookComponent },
  { path: 'borrow-book', component: BorrowBookComponent },
    { path: 'manage-books', component: ManageBooksComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent},
    {path: 'signup', component: SignUpComponent  }
  ];


