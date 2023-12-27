import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/model/Product/product';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private _API_URL = 'http://localhost:8080/api/products/';
  private _FAVORITES_URL = 'http://localhost:8080/api/favorites/';
  private favoritesSubject = new BehaviorSubject<Product[]>([]);
  favorites$ = this.favoritesSubject.asObservable();

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
    const favorites = [...this.favoritesSubject.value, product];
    this.favoritesSubject.next(favorites);

    return this.http.post<Product>(this._API_URL, product);

  }

  deleteProductAtId(id: number): Observable<void> {
    const favorites = this.favoritesSubject.value
  .filter((p): p is Product => p && p.id !== id);
this.favoritesSubject.next(favorites);

    return this.http.delete<void>(this._API_URL + id);
  }
  addToFavorites(product: Product): Observable<Product> {
    return this.http.post<Product>(this._FAVORITES_URL + 'email', product);
  }
  removeFromFavorites(id: number): Observable<void> {
    return this.http.delete<void>(this._FAVORITES_URL + id);
  }
  updateFavorites(): void {
    this.http.get<Product[]>(this._FAVORITES_URL + 'email').subscribe(
      (favorites) => {
        this.favoritesSubject.next(favorites);
      },
      (error) => {
        console.error('Lỗi khi cập nhật danh sách yêu thích:', error);
      }
    );
  }
}
