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

  signInForm: SignInForm = {
    email: '',
    password: ''
  };
  username = '';
  roles: string[] = [];

  constructor(private authService : AuthService,
              private tokenStorageService : TokenStorageService,
              private router : Router,
              private activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {

  }

  login(){
    
  }
}


