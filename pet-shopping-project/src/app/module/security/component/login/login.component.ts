import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators,FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/service/Auth/auth.service';
import { ShareService } from 'src/app/service/Auth/share.service';
import { TokenStorageService } from 'src/app/service/Token/token-storage.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  signinForm: FormGroup;
  roles: string[];
  username: any;

  constructor(private sharedService: ShareService,
              private authService: AuthService,
              private router: Router,
              private tokenStorageService :TokenStorageService) { }

  ngOnInit(): void {
    this.signinForm = new FormGroup({
      email: new FormControl('', [Validators.required,]),
      password: new FormControl('', [Validators.required,Validators.maxLength(32)]),
    }
    );
  }

  onSubmit() {
    if (this.signinForm.valid) {
      this.authService.login(this.signinForm.value).subscribe(
        data => {
          this.tokenStorageService.saveRoleLocal(data.role);
          this.tokenStorageService.saveUserLocal(data.name);
          this.tokenStorageService.saveTokenLocal(data.token);
          this.router.navigate(['/home']);
        },
        error => {
          console.error('Lỗi đăng nhập', error);          
        }
      );
    }
  }
}


