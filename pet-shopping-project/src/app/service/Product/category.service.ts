import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/model/Product/category';
import { TokenStorageService } from '../Token/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private _API_URL = 'http://localhost:8080/api/categories';

  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get<Category[]>(this._API_URL);
  }
}
