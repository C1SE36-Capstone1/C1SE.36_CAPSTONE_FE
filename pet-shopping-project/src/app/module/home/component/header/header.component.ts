import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  
  show = false;

  showOptions: boolean = false;
  
  constructor(private router: Router) { }

  redirectToCart() {
    this.router.navigate(['/carts']);
  }

  ngOnInit(): void {
  }

  openpopup(){
    this.show = !this.show;
  }

  closepopup(){
    this.show = false;
  }
}
