
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenStorageService } from '../Token/token-storage.service';
import { CartWithDetail } from 'src/app/model/Cart/cart-with-detail';
import { Observable } from 'rxjs';
import { PaymentResponse } from 'src/app/model/Cart/payment-response';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private _API_URL = 'http://localhost:8080/api/payment';

  constructor(private httpClient: HttpClient,
    private tokenStorageService: TokenStorageService) { }

    getPaid(cartWithDetail: CartWithDetail): Observable<PaymentResponse> {
      const token = this.tokenStorageService.getToken();
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.httpClient.put<PaymentResponse>(`${this._API_URL}`, cartWithDetail, {headers});
    }
  
    transactionSuccess(txnRef: string): Observable<any> {
      const token = this.tokenStorageService.getToken();
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.httpClient.get<any>(`${this._API_URL}/transaction/${txnRef}`, {headers});
    }

    transactionFail(txnRef: string): Observable<any> {
      const token = this.tokenStorageService.getToken();
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.httpClient.get<any>(`${this._API_URL}/fail/${txnRef}`, {headers});
    }

  }
