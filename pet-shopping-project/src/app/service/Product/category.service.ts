import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/model/Product/category';


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

  getCategoryById(id: number): Observable<Category> {
    return this.http.get<Category>(this._API_URL + '/' + id);
  }
}
