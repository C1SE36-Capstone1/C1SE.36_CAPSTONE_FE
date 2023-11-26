import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  selectedTab: string = 'tab1';

  changeTab(tab: string) {
    this.selectedTab = tab;
  }
  constructor() { }

  ngOnInit(): void {
  }

}
