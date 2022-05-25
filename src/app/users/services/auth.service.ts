import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';
import {BehaviorSubject} from 'rxjs';
import {APIEndpointURLs} from '../../api-endpoint-urls';
import {User} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  private readonly TOKEN = 'token';
  currentUser: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  login(email, password) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa(email + ':' + password)
    });

    return this.http.post<any>(APIEndpointURLs.authLogin, {}, {headers}).pipe(
      map(response => {
        const result = response[this.TOKEN];
        if (result) {
          localStorage.setItem(this.TOKEN, result);

          const jwt = new JwtHelperService();
          const tempUser: User = jwt.decodeToken(localStorage.getItem(this.TOKEN));

          if (tempUser.email === 'invalid') {
            localStorage.removeItem(this.TOKEN);
            return false;
          }

          this.currentUser.next(tempUser);
          return true;
        } else {
          return false;
        }
      }));
  }
}
