import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartDetail } from 'src/app/model/Cart/cart-detail';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private _CART_URL = 'http://localhost:8080/api/cartDetail';


  constructor(private http: HttpClient) { }

  addToCart( cartDetail : CartDetail): Observable<CartDetail> {
    return this.http.post<CartDetail>(this._CART_URL, cartDetail);
  }

  getCartItems(): Observable<any[]> {
    return this.http.get<any[]>(this._CART_URL);
  }

  removeFromCart(cartItemId: number): Observable<any> {
    const url = `${this._CART_URL}/${cartItemId}`;
    return this.http.delete<any>(url);
  }

  updateCartItemQuantity(cartItemId: number, quantity: number): Observable<any> {
    const url = `${this._CART_URL}/${cartItemId}`;
    const body = { quantity };
    return this.http.put<any>(url, body);
  }

  checkout(): Observable<any> {
    return this.http.post<any>(`${this._CART_URL}/checkout`, {});
  }

}