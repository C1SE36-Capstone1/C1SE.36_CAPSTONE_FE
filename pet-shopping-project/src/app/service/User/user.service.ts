import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {TokenStorageService} from "../Token/token-storage.service";
import { Observable } from 'rxjs';
import { UserInfo } from 'src/app/model/User/user-info';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _API_URL = 'http://localhost:8080/api/auth/';

  constructor(private http: HttpClient,
    private tokenStorageService: TokenStorageService){}

    getUser(): Observable<UserInfo> {
      const token = this.tokenStorageService.getToken();
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.get<UserInfo>(`${this._API_URL}detail`, {headers});
    }
}
