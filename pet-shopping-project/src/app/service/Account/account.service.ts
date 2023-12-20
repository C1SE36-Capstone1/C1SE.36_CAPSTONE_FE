import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SignUpForm } from 'src/app/model/Request/sign-up-form';


@Injectable({ providedIn: 'root' })
export class AccountService {
  private apiBaseUrl = 'http://localhost:8080/api/auth/user';

  constructor(private http: HttpClient) { }

  register(signUpForm: SignUpForm): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}/signup`, signUpForm);
  }

}
