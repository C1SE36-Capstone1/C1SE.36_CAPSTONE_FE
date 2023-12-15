import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Product } from 'src/app/model/Product/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private _API_URL = 'http://localhost:8080/api/products/';

  constructor (private http: HttpClient) {
  }

  getAll() {
    return this.http.get<Product[]>(this._API_URL);
  }

  getByCategory(id : number) : Observable<Product[]>{
    return this.http.get<Product[]>(this._API_URL + 'category/' + id)
  }

  getProductById(id:number): Observable<Product>{
    return this.http.get<Product>(this._API_URL + id );
  }

  updateProductAtId(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(this._API_URL + id, product);
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this._API_URL, product);
  }

  deleteProductAtId(id: number): Observable<void> {
    return this.http.delete<void>(this._API_URL + id);
  }

}
