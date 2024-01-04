import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { TokenStorageService } from '../Token/token-storage.service';
import { SignInForm } from 'src/app/model/Request/sign-in-form';
import { JwtResponse } from 'src/app/model/Response/jwt-response';

import { catchError, tap } from 'rxjs/operators';
import { ShareService } from './share.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  AUTH_API = 'http://localhost:8080/api/auth/user';
  httpOptions: any;
  isLoggedIn: boolean;
  private currentUserSubject = new Subject<any>();
  currentUserObservable: Observable<any> = this.currentUserSubject.asObservable();

  constructor(private httpClient: HttpClient, 
              private tokenStorageService: TokenStorageService,) {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        'Access-Control-Allow-Origin': 'http://localhost:4200',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'      
    };
    this.emitCurrentUser(); // Phát thông tin người dùng hiện tại khi service khởi tạo
  }

  login(loginRequest : SignInForm): Observable<JwtResponse> {
    return this.httpClient.post<JwtResponse>(`${this.AUTH_API}/signin`, loginRequest, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }


  logout(): void {
    // Xử lý đăng xuất...
    this.tokenStorageService.signOut();
    this.currentUserSubject.next(null);
  }

  emitCurrentUser() {
    const user = this.tokenStorageService.getUser();
    this.currentUserSubject.next(user);
  }

}
