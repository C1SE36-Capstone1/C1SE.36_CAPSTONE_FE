import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/service/Token/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  currentUser: any;
  isLoggedIn : boolean;
  username: string;
  show = false;

  showOptions: boolean = false;
  
  constructor(private router: Router,
              private tokenStorageService: TokenStorageService){}            

  ngOnInit(): void {

    this.isLoggedIn = !!this.tokenStorageService.getToken();
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
    if (this.isLoggedIn) {
      console.log('Token header 1 is: '+this.tokenStorageService.getToken());
      console.log('Email user: '+ this.currentUser?.email);
      
      this.router.navigate(['/user-info']);
    } else if(this.tokenStorageService.getToken()==null) {
      console.log('Token header 2 is: '+this.tokenStorageService.getToken());
      
      this.router.navigate(['/login']);
    }
  }
}
