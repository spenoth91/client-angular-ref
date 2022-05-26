import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserListComponent} from './users/components/user-list/user-list.component';
import {HomeComponent} from './home/home.component';
import {AuthGuard} from './account/component/services/auth.guard';
import {LoginComponent} from './account/component/login/login.component';
import {RegisterComponent} from './account/component/register/register.component';


const routes: Routes = [
  {path: 'users', component: UserListComponent, canActivate: [AuthGuard]},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
