// cart.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from 'src/app/model/Product/product';
import { CartDetail } from 'src/app/model/Cart/cart-detail';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private _API_URL = 'http://localhost:8080/api/cartDetail/';

  constructor(private http: HttpClient){}

  getCartDetails(cartId: number): Observable<CartDetail[]> {
    const _API_URL = `${this._API_URL}cart/${cartId}`;
    return this.http.get<CartDetail[]>(_API_URL);
  }


  addToCart(detail: CartDetail): Observable<CartDetail> {
    if (!detail.cart) {
      detail.cart = {};
    }
    detail.cart.cartId = 1;
    return this.http.post<CartDetail>(this._API_URL, detail).pipe(
      tap((response) => console.log('Add to cart response:', response))
    );
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
