import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators,FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/service/Account/account.service';
import { AuthService } from 'src/app/service/Auth/auth.service';
import { TokenStorageService } from 'src/app/service/Token/token-storage.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  signinForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private tokenStorageService :TokenStorageService) { }

  ngOnInit(): void {
    this.signinForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.signinForm.valid) {
      this.authService.login(this.signinForm.value).subscribe(
        data => {
          // Lưu token và thông tin người dùng
          // Chuyển hướng người dùng sau khi đăng nhập thành công
          this.router.navigate(['/home']);
        },
        error => {
          console.error('Lỗi đăng nhập', error);
          // Xử lý lỗi đăng nhập tại đây
          
        }
      );
    }
  }
}


