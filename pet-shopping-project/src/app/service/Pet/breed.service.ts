import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Breed } from 'src/app/model/Pet/breed';

@Injectable({
  providedIn: 'root'
})
export class BreedService {

  private _API_URL = 'http://localhost:8080/api/breed';

  constructor(private http: HttpClient) { }

  getAllBreed(){
    return this.http.get<Breed[]>(this._API_URL);
  }

  getBreedById(id: number): Observable<Breed> {
    return this.http.get<Breed>(this._API_URL + '/' + id);
  }
}
