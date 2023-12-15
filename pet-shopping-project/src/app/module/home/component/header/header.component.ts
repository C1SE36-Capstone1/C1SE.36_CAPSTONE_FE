import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/service/Token/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn : boolean;
  username: string;
  show = false;

  showOptions: boolean = false;
  
  constructor(private router: Router,
              private tokenStorageService: TokenStorageService){}            

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    this.username = this.tokenStorageService.getUser();
    console.log('user: ' +this.username)
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
    if (this.isLoggedIn) {
      this.router.navigate(['/user-info']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
