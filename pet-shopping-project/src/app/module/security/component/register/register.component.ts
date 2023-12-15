import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Role } from 'src/app/model/User/role';
import { AccountService } from 'src/app/service/Account/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  role: Role[] = [];

  constructor(private accountService: AccountService,
              private router: Router) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      username: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required]),
      phone: new FormControl('',[Validators.required]),
      address: new FormControl('',[Validators.required]),
      gender: new FormControl('',[Validators.required]),
      status: new FormControl('',[Validators.required]),
      image: new FormControl('',[Validators.required]),
      code: new FormControl('',[Validators.required]),
      role: new FormControl('',[Validators.required]),
    });
  }

  submitAddAccount(): void{
    
  }


}
