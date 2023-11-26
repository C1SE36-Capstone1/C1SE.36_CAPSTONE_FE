import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  OnlyNumerAllowed(event: any):boolean{
    const charCode = (event.which) ? event.which : event.keyCode;
    if(charCode > 31 && (charCode < 48 || charCode > 57 ))
    {
      return false
    }
    return true
  }

}
