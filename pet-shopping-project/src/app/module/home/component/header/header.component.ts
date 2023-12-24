import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/service/Token/token-storage.service';
import { AuthService } from '../../../../service/Auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  currentUser: any;
  username: string;
  show = false;

  showOptions: boolean = false;
  role: string[];
  
  constructor(private router: Router,
              private authService : AuthService,
              private tokenStorageService: TokenStorageService){}            

  ngOnInit(): void {
    this.authService.isLoggedIn = !!this.tokenStorageService.getToken();
    this.username = this.tokenStorageService.getUser();
    this.currentUser = this.tokenStorageService.getUser();
    console.log('Email user: ' +this.currentUser?.email)
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
    if(this.authService.isLoggedIn)
      this.router.navigate(['/user-info']);
    else
      this.router.navigate(['/login'])
  }
}
