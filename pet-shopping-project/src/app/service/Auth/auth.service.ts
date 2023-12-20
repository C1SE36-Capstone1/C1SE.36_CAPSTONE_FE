import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { JwtResponse } from 'src/app/model/Response/jwt-response';
import { TokenStorageService } from '../Token/token-storage.service';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  AUTH_API = 'http://localhost:8080/api/auth/user';
  httpOptions: any;
  isLoggedIn: boolean;
  private currentUserSubject = new Subject<any>();
  currentUserObservable: Observable<any> = this.currentUserSubject.asObservable();

  constructor(private httpClient: HttpClient, private tokenStorageService: TokenStorageService) {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };

    this.isLoggedIn = !!this.tokenStorageService.getToken();
    this.emitCurrentUser(); // Phát thông tin người dùng hiện tại khi service khởi tạo
  }

  login(credentials: { email: string; password: string }): Observable<JwtResponse> {
    return this.httpClient.post<JwtResponse>(`${this.AUTH_API}/signin`, credentials, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      observe: 'body' // Thêm dòng này
    }).pipe(
      tap((response: JwtResponse) => {
        this.tokenStorageService.saveTokenLocal(response.token);
        this.tokenStorageService.saveUserLocal(response.user);
        // ... các xử lý khác ...
      })
    );
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
