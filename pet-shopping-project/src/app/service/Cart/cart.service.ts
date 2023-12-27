// cart.service.ts
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from 'src/app/model/Product/product';
import { CartDetail } from 'src/app/model/Cart/cart-detail';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TokenStorageService } from '../Token/token-storage.service';
import { CartWithDetail } from 'src/app/model/Cart/cart-with-detail';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private _API_URL = 'http://localhost:8080/api/cartDetail/';

  constructor(private http: HttpClient,
    private tokenStorageService: TokenStorageService){}

    getCart(): Observable<CartWithDetail> {
      const token = this.tokenStorageService.getToken();
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.get<CartWithDetail>(this._API_URL, {headers});
    }
    


  addToCart(productId: number): Observable<CartDetail[]> {
    const token = this.tokenStorageService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<CartDetail[]>(`${this._API_URL}cart/add/${productId}`, {headers});
  }


  updateCartDetail(detail: CartDetail): Observable<CartDetail> {
    if (!detail.cart) {
      detail.cart = {};
    }
    detail.cart.cartId = 1;
    return this.http.put<CartDetail>(this._API_URL, detail);
  }

  deleteCartDetail(id: number): Observable<void> {
    const _API_URL = `${this._API_URL}${id}`;
    return this.http.delete<void>(_API_URL);
  }

}
