import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { favorite } from 'src/app/model/Product/favorite';
import { catchError } from 'rxjs/operators';
import { TokenStorageService } from '../Token/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private API_URL = 'http://localhost:8080/api/favorites/';

  constructor(private http: HttpClient,
    private tokenStorageService: TokenStorageService) { }

  
  // addProductToFavorite(id: number): Observable<favorite[]> {
  //   const token = this.tokenStorageService.getToken();
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  //   return this.http.get<favorite[]>(`${this.API_URL}add/${id}`,{headers});
  // }


}
