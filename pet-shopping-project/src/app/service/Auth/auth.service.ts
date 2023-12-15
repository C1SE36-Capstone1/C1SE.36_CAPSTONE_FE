import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { SignInForm } from 'src/app/model/Request/sign-in-form';
import { JwtResponse } from 'src/app/model/Response/jwt-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  AUTH_API = 'http://localhost:8080/api/auth';

  httpOptions: any;
  isLoggedIn: boolean;

  constructor( private httpClient: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }

  login(signInForm: SignInForm): Observable<JwtResponse> {
    return this.httpClient.post<JwtResponse>(this.AUTH_API + '/user/signin', signInForm);
  }

}
