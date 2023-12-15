import { Injectable } from '@angular/core';

const TOKEN_KEY = 'TOKEN-KEY';
const USER_KEY = 'USER-KEY';
const ROLE_KEY = 'ROLE-KEY';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  private role?: string[];

  constructor() { }

  signOut() {
    window.sessionStorage.clear();
    window.localStorage.clear();
  }

  public saveTokenSession(token: string) :void{
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public saveUserSession(user) :void{
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public saveRoleSession(role) :void{
    window.sessionStorage.removeItem(ROLE_KEY);
    window.sessionStorage.setItem(ROLE_KEY, JSON.stringify(role));
  }

  public getRole() :string[] {
    this.role = [];
    if(this.getToken()){
      JSON.parse(sessionStorage.getItem(ROLE_KEY)).array.forEach(role => {
        this.role?.push(role.name)
      });
    }
    return this.role;
  }

  public getUser()  {
      return JSON.parse(sessionStorage.getItem(USER_KEY));
  }

  public getToken(): string {
      return sessionStorage.getItem(TOKEN_KEY);
    
  }
}
