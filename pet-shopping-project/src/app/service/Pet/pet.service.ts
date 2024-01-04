import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Pet } from 'src/app/model/Pet/pet';

@Injectable({
  providedIn: 'root'
})
export class PetService {

    private _API_URL = 'http://localhost:8080/api/pet';

  constructor(private http: HttpClient) { }

  getAllPet(){
    return this.http.get<Pet[]>(this._API_URL);
  }

  getByBreedId(id : number): Observable<Pet[]>{
    return this.http.get<Pet[]>(this._API_URL + '/category/' + id)
  }

  getDetailById(id : number): Observable<Pet>{
    return this.http.get<Pet>(this._API_URL + '/' + id)
  }

  addPet(pet: Pet): Observable<Pet> {
    return this.http.post<Pet>(this._API_URL + '/', pet);
  }

  updatePetAtId(id: number, pet: Pet): Observable<Pet> {
    return this.http.put<Pet>(this._API_URL + '/' + id, pet);
  }

  deletePetAtId(id: number): Observable<void> {
    return this.http.delete<void>(this._API_URL + '/' + id);
  }
}
