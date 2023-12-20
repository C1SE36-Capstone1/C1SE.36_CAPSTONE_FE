import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from './service/Token/token-storage.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
              private tokenStorageService: TokenStorageService){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const token = this.tokenStorageService.getToken();
      if (token && token.trim() !== '') {
        return true;
      }

      // Sử dụng promise của SweetAlert2 để đảm bảo chuyển hướng sau khi thông báo đóng
      return Swal.fire({
        position: 'center',
        icon: 'info',
        title: 'Bạn phải đăng nhập để sử dụng chức năng này!',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        return this.router.createUrlTree(['/login'], {queryParams: {returnUrl: state.url}});
      });
  }
}
