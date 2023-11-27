import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  show = false;

  showOptions: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  openpopup(){
    this.show = !this.show;
  }

  closepopup(){
    this.show = false;
  }
}
