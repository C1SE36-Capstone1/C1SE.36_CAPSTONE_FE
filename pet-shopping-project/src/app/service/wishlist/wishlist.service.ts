import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { favorite } from 'src/app/model/Product/favorite';
import { catchError, tap } from 'rxjs/operators';
import { TokenStorageService } from '../Token/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private API_URL = 'http://localhost:8080/api/favorites';

  constructor(private http: HttpClient,
    private tokenStorageService: TokenStorageService) { }

  getFavorites(): Observable<favorite[]> {
    const token = this.tokenStorageService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<favorite[]>(`${this.API_URL}`,{headers});
  }

  addProductToFavorite(id: number): Observable<favorite[]> {
    const token = this.tokenStorageService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<favorite[]>(`${this.API_URL}/add/${id}`, {headers});
  }

  deleteFavorite(favoriteId: number): Observable<void> {
    const url = `${this.API_URL}/${favoriteId}`;
    console.log('URL Xóa:', url); // Ghi log URL
    return this.http.delete<void>(url);
  }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Xử lý lỗi client-side
      console.error('An error occurred:', error.error.message);
    } else {
      // Xử lý lỗi server-side
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    }

    // Trả về một observable với thông báo lỗi để component có thể xử lý
    return throwError('Something bad happened; please try again later.');
  }
}




