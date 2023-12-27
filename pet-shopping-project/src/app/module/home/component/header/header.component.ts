import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/service/Token/token-storage.service';
import { AuthService } from '../../../../service/Auth/auth.service';
import { ShareService } from 'src/app/service/Auth/share.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  currentUser: any;
  username: string;
  show = false;
  isLogin : boolean
  showOptions: boolean = false;
  role: string[];
  
  constructor(private router: Router,
              private tokenStorageService: TokenStorageService,
              shareService: ShareService){}            

  ngOnInit(): void {
    this.username = this.tokenStorageService.getUser();
    this.isLogin = this.username != null;
    console.log('Name: ' + this.username)
  }

  loadHeader(): void {
    if (this.tokenStorageService.getToken()) {
      this.currentUser = this.tokenStorageService.getUser();
      this.role = this.tokenStorageService.getRole();
      this.username = this.tokenStorageService.getUser();
    }
  }

  openpopup(){
    this.show = !this.show;
  }

  closepopup(){
    this.show = false;
  }

  redirectToCart() {
    this.router.navigate(['/carts']);
  }

  navigateToUserInfo() {
    if(this.isLogin)
      this.router.navigate(['/user-info']);
    else
      this.router.navigate(['/login'])
  }
}
