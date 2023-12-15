import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/model/User/user';
import { TokenStorageService } from '../Token/token-storage.service';
import { Observable } from 'rxjs';
import { SignUpForm } from 'src/app/model/Request/sign-up-form';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private _API_URL = 'http://localhost:8080/api/auth';

  constructor(private http : HttpClient,
              private tokenStorageService: TokenStorageService) { }

  addUser(signUpForm: SignUpForm) : Observable<SignUpForm>{
    const token = this.tokenStorageService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<SignUpForm> (this._API_URL +'/user/signup', signUpForm, {headers});
  }

  getAllAcount() : Observable<User[]>{
    return this.http.get<User[]>(this._API_URL)
  }
}
