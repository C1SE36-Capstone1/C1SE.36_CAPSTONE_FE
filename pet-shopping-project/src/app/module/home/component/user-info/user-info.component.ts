import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/service/Token/token-storage.service';


@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  currentUser: any;
  selectedTab: string = 'tab1';
  role : any;

  changeTab(tab: string) {
    this.selectedTab = tab;
  }

  constructor(private tokenStorageService: TokenStorageService,
              private router: Router,) {}

  ngOnInit(): void {
    this.currentUser = this.tokenStorageService.getUser();
    this.role = this.tokenStorageService.getRole();
    console.log(this.role);
  }

  signout(){
    this.tokenStorageService.signOut();
    this.router.navigate(['/home']).then(() => {
      window.location.reload();
  });
    
  }
}