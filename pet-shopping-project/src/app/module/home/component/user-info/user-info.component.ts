import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/service/Token/token-storage.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  username: string;

  constructor(private tokenStorageService: TokenStorageService,
              private router: Router) {}

  ngOnInit(): void {
    // Lấy thông tin người dùng từ TokenStorageService
    this.username = this.tokenStorageService.getUser();
    // Các thông tin khác cũng có thể được lấy tùy thuộc vào cách bạn lưu chúng trong TokenStorageService
    console.log('Username:', this.username);
  }

  signout(){
    this.tokenStorageService.signOut();
    this.router.navigateByUrl('/home');
  }
}
