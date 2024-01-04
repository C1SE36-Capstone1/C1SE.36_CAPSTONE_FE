import { Injectable } from '@angular/core';

const TOKEN_KEY = 'TOKEN-KEY';
const USER_KEY = 'USER-KEY';
const ROLE_KEY = 'ROLE-KEY';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor() { }

  signOut() {
    window.sessionStorage.clear();
    window.localStorage.clear();
  }

  // Lưu vào sessionStorage
  public saveTokenSession(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public saveUserSession(user): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public saveRoleSession(role): void {
    window.sessionStorage.removeItem(ROLE_KEY);
    window.sessionStorage.setItem(ROLE_KEY, JSON.stringify(role));
  }

  // Lưu vào localStorage
  public saveTokenLocal(token: string): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  public saveUserLocal(user): void {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public saveRoleLocal(role): void {
    window.localStorage.removeItem(ROLE_KEY);
    window.localStorage.setItem(ROLE_KEY, JSON.stringify(role));
  }

  // Lấy dữ liệu từ cả sessionStorage và localStorage
  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY) || localStorage.getItem(TOKEN_KEY);
  }

  public getUser() {
    const sessionUser = sessionStorage.getItem(USER_KEY);
    const localUser = localStorage.getItem(USER_KEY);

    if (sessionUser) {
      return JSON.parse(sessionUser);
    } else if (localUser) {
      return JSON.parse(localUser);
    } else {
      return null;
    }
  }


  public getRole(): string[] {
    const roleData = sessionStorage.getItem(ROLE_KEY) || localStorage.getItem(ROLE_KEY);
    return roleData ? JSON.parse(roleData).map(role => role.name) : [];
  }
}
