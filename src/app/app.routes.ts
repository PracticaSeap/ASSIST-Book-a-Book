import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/main-login/login/login.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { AddBookComponent } from './components/admin/add-book/add-book.component';
import { ManageBooksComponent } from './components/admin/manage-books/manage-books.component';
import { ForgotPasswordComponent } from './components/main-login/forgot-password/forgot-password.component'

export const appRoutes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'book-details/:id', component: BookDetailsComponent },
    { path: 'add-book', component: AddBookComponent },
    { path: 'manage-books', component: ManageBooksComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent}
  ];


