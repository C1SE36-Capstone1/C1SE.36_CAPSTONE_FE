// payment.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private _API_URL = 'http://localhost:8080/api/payment/';

  constructor(private http: HttpClient) {}

  processPayment(cartId: number): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(`${this._API_URL}processPayment/${cartId}`, {}, { headers });
  }
}
