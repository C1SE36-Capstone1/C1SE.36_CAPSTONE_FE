import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  showScrollButton: boolean = false;

  @HostListener('window:scroll', [])
  
  onWindowScroll() {
    this.showScrollButton = window.scrollY > 200; // Hiển thị icon khi cuộn xuống dưới 100px
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Cuộn trang lên trên với hiệu ứng mượt
  }
  constructor() { }

  ngOnInit(): void {
  }

}
