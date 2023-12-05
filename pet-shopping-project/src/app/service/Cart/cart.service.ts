import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private _API_URL = 'http://localhost:8080/api/products/';

  constructor(private http: HttpClient) { }
}
