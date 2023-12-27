import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SignUpForm } from 'src/app/model/Request/sign-up-form';
import { User } from 'src/app/model/User/user';


@Injectable({ providedIn: 'root' })
export class AccountService {
  private _API_URL = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) { }

  register(signUpForm: SignUpForm): Observable<any> {
    return this.http.post(`${this._API_URL}/create`, signUpForm);
  }
  
  getAllAcount() : Observable<User[]>{
    return this.http.get<User[]>(this._API_URL)
  }
}
