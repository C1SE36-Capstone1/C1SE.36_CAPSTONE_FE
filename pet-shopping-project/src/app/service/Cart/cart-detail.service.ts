import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartDetailService {

  private _CART_URL = 'http://localhost:8080/api/cartDetail';
  constructor() { }
}


