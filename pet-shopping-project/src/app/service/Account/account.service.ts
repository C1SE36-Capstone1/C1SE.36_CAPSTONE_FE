import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/model/User/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private _API_URL = 'http://localhost:8080/api/auth';

  constructor(private http : HttpClient) { }

  getAllAccount(){
    return this.http.get<User[]>(this._API_URL);
  }
}
