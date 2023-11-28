import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Product } from 'src/app/model/Product/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private _API_URL = 'http://localhost:8080/api/products';

  constructor (private http: HttpClient) {
  }

  getAll() {
    return this.http.get<Product[]>(this._API_URL);
  }

  getProduct(id:number): Observable<Product>{
    return this.http.get<Product>('this._API_URL/${id}');
  }

  getProductByCategoryId(id: number): Observable<any> {
    // Check if the product exists by ID
    return this.http.get(`${this._API_URL}/${id}`).pipe(
      ((error) => {
        return new Observable<any>();
      }),
      ((response: any) => {
        // Assuming your backend returns a valid product
        const category = response.category;

        
        return this.http.get(`${this._API_URL}/category/${category}`).pipe(
          ((error) => {
            // Handle error, for example, return a not-found response
            return new Observable<any>(); // Replace with proper error handling
          })
        );
      })
    );
  }
  // getByCategory(id: number): Observable<Product[]> {
  //   return this.http.get<Product[]>(this._API_URL + '/' + id);
  // }
}
