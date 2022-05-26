﻿import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import {APIEndpointURLs} from '../../../api-endpoint-urls';
import {User} from '../../../users/models/user.model';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({ providedIn: 'root' })
export class AccountService {
  currentUser: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  private readonly TOKEN = 'token';

  constructor(private http: HttpClient, private router: Router) {
    const token = localStorage.getItem(this.TOKEN);
    if (token) {
      const jwt = new JwtHelperService();
      this.currentUser.next(jwt.decodeToken(token));
    }
  }

  login(email: string, password: string) {
    return this.http.post<any>(
      APIEndpointURLs.loginUrl, {email, password}, ).pipe(
      map(response => {
        const result = response[this.TOKEN];
        if (result) {
          localStorage.setItem(this.TOKEN, result);

          // const jwt = new JwtHelperService();
          // const tempUser: User = jwt.decodeToken(localStorage.getItem(this.TOKEN));
          // console.log('tempUser: ', tempUser);
          //
          // if (tempUser.lastName === 'invalid') {
          //   localStorage.removeItem(this.TOKEN);
          //   return false;
          // }
          //
          // this.currentUser.next(tempUser);
          return true;
        } else {
          return false;
        }
      }));
  }

  logout() {
    localStorage.removeItem(this.TOKEN);
    // this.currentUser.next(null);
    this.router.navigate(['home']);
  }

  isLoggedIn(): boolean {
    const jwt = new JwtHelperService();
    const token = localStorage.getItem(this.TOKEN);
    return !jwt.isTokenExpired(token);
  }

    register(user: User) {
        return this.http.post(APIEndpointURLs.registerUrl, user);
    }

    getToken(): string {
      return localStorage.getItem(this.TOKEN);
    }
}
