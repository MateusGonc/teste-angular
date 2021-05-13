import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';
import { Token } from '../_models/token';
//import { PresenceService } from './presence.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private baseUrl: string = environment.apiUrl;
  public currentUserSource = new ReplaySubject<User>(1);
  currentUser$: Observable<User> = this.currentUserSource.asObservable();

  constructor(private http: HttpClient, private registerService: RegisterService) { }

  login(model: any) {
    return this.http.post(this.baseUrl + 'usuarios/login', model)
      .pipe(
        map((response: Token) => {
          const token = response;
          if (token) {
            this.setToken(token);
          }
          return token;
        })
      );
  }

  logged(): Observable <any> {
    let token = this.getToken();
    console.log(token);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });
    console.log(headers);

    return this.http.get(this.baseUrl + 'usuarios/logado', { headers });
  }

  register(model: any) {
    return this.http.post(this.baseUrl + 'usuarios', model)
      .pipe(
        map((user: User) => {
          if (user) {
            this.setCurrentUser(user);
          }
          return user;
        })
      );
  }

  setToken(token: Token) {
    if (token != null)
      localStorage.setItem('token', token.access_token);
    else
      localStorage.setItem('token', '');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  setCurrentUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }

  getDecodedToken(token) {
    return JSON.parse(atob(token.split('.')[1]));
  }
}