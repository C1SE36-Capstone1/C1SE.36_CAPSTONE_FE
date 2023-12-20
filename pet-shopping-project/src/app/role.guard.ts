import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from './service/Token/token-storage.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private router: Router,
              private tokenStorageService: TokenStorageService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const requiredRoles = next.data.roles;
    const userRoles = this.tokenStorageService.getRole() || [];

    const hasRequiredRole = requiredRoles.some(role => userRoles.includes(role));

    if (hasRequiredRole) {
      return true;
    } else {
      return Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Bạn không được phép sử dụng chức năng này!',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        return this.router.createUrlTree(['/']);
      });
    }
  }
}
