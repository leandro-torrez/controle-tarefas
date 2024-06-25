import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Login, UserToken } from '../../types/login';
import { env } from '../../environment/env';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = '/api/Autenticacao/login';
  private _http = inject(HttpClient);
  private router = inject(Router);

  private isLogged = new BehaviorSubject<boolean>(false);
  isLogged$ = this.isLogged.asObservable();

  constructor() {
    this.checkToken();
  }

  login(formLogin: Login): Observable<UserToken> {
    const params = new HttpParams()
      .set('login', formLogin.login)
      .set('senha', formLogin.senha);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this._http.get<UserToken>(this.apiUrl, { headers, params }).pipe(
      tap((userToken: UserToken) => {
        localStorage.setItem('token', userToken.token);
        this.isLogged.next(true);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.isLogged.next(false);
    this.router.navigate(['login']);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  private checkToken() {
    const token = this.getToken();

    if (token) {
      this.isLogged.next(true);
    } else {
      this.isLogged.next(false);
    }
  }
}
