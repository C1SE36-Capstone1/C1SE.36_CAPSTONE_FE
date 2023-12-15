import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../service/Auth/auth.service';
import { TokenStorageService } from 'src/app/service/Token/token-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SignInForm } from 'src/app/model/Request/sign-in-form';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;
  formSignUp: FormGroup;
  email = '';
  returnUrl: string;
  message = '';
  showPassword = false;


  constructor(private authService : AuthService,
              private tokenStorageService : TokenStorageService,
              private router : Router,
              private activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.formLogin = new FormGroup({
      // email: new FormControl('', [Validators.required, Validators.pattern("^\\w{4,}.?\\w+(@\\w{3,8})(.\\w{3,8})+$")]),
      // password: new FormControl('', [ Validators.required, Validators.maxLength(32)]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      remember_me: new FormControl('')
    })


  }

  login(){
    
  }
}


