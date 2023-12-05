import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../service/Auth/auth.service';
import { TokenStorageService } from 'src/app/service/Token/token-storage.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;
  formSignUp: FormGroup;
  email = '';
  roles: string[] = [];
  returnUrl: string;
  message = '';
  showPassword = false;

  constructor(private authService : AuthService,
              private tokenStorageService : TokenStorageService,
              private router : Router,
              private activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.formLogin = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern("^\\w{4,}.?\\w+(@\\w{3,8})(.\\w{3,8})+$")]),
      password: new FormControl('', [ Validators.required, Validators.maxLength(32)]),
      remember_me: new FormControl('')
    })

    // this.formSignUp = new FormGroup({
    //   fullName: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(50), Validators.pattern("^[a-zA-Zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]+(\\s[a-zA-Zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]+)*$")]),
    //   email: new FormControl('', [Validators.required, Validators.pattern("^\\w{4,}.?\\w+(@\\w{3,8})(.\\w{3,8})+$")]),
    //   password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(55),
    //     Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]+$')]),
    //   confirmPassword: new FormControl('', [Validators.required]),
    //   phoneNumber: new FormControl('', [Validators.required, Validators.pattern("^(0\\d{9,10})$")]),
    // })

    if (this.tokenStorageService.getToken()) {
      const user = this.tokenStorageService.getUser();
      this.authService.isLoggedIn = true;
      this.roles = this.tokenStorageService.getRole();
      this.email = this.tokenStorageService.getUser();
    }
  }

  onSubmit() {
    this.authService.login(this.formLogin.value).subscribe(data => {
      if (this.formLogin.value.remember_me) {
        sessionStorage.clear();
        this.tokenStorageService.saveTokenLocal(data.token);
        this.tokenStorageService.saveUserLocal(data.email);
        this.tokenStorageService.saveRoleLocal(data.roles[0]);
      } else {
        localStorage.clear();
        this.tokenStorageService.saveTokenSession(data.token);
        this.tokenStorageService.saveUserSession(data.email);
        this.tokenStorageService.saveRoleSession(data.roles[0]);
      }
      this.authService.isLoggedIn = true;
      this.formLogin.reset();
    },
    err => {
      this.authService.isLoggedIn = false;
    });
  }
}


