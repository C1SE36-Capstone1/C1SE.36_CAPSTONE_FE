import { Component, ElementRef, OnInit } from '@angular/core';
import { Product } from 'src/app/model/Product/product';
import { ProductService } from 'src/app/service/Product/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  discountProduct : Product[];
  newestProduct : Product[];
  itemsPerPage = 5;
  newestProductIndex = 0;
  discountProductIndex = 0;

  constructor(private productService : ProductService,
              private el: ElementRef) { }

  ngOnInit(): void {
    this.get10NewestProduct();
    this.getTopDiscountedProducts();
  }

  get10NewestProduct(){
    this.productService.getAll().subscribe((data) => {
      data.sort((a, b) => b.productId - a.productId);
      this.newestProduct = data.slice(0, 10);
    })
  }

  getTopDiscountedProducts() {
    this.productService.getAll().subscribe((data) => {
      // Lọc ra các sản phẩm có giảm giá và sắp xếp theo giảm giá giảm dần
      const discountedProducts = data.filter(product => product.discount > 0);
      discountedProducts.sort((a, b) => b.discount - a.discount);

      // Lấy 10 sản phẩm có giảm giá cao nhất
      this.discountProduct = discountedProducts.slice(0, 10);
    });
  }

  next(number: number) {
    switch (number) {
      case 1:
        const newestLastIndex = this.newestProduct.length - this.itemsPerPage;
        this.newestProductIndex = (this.newestProductIndex + 1) % (newestLastIndex + 1);
        break;
      case 2:
        // Handle case 2 logic here
        break;
      case 3:
        const discountLastIndex = this.discountProduct.length - this.itemsPerPage;
        this.discountProductIndex = (this.discountProductIndex + 1) % (discountLastIndex + 1);
        break;
      default:
        // Handle default case or do nothing
        break;
    }
  }
  
  prev(number: number) {
    switch (number) {
      case 1:
        const newestLastIndex = this.newestProduct.length - this.itemsPerPage;
        this.newestProductIndex = (this.newestProductIndex - 1 + newestLastIndex + 1) % (newestLastIndex + 1);
        break;
      case 2:
        // Handle case 2 logic here
        break;
      case 3:
        const discountLastIndex = this.discountProduct.length - this.itemsPerPage;
        this.discountProductIndex = (this.discountProductIndex - 1 + discountLastIndex + 1) % (discountLastIndex + 1);
        break;
      default:
        // Handle default case or do nothing
        break;
    }
  }

  scrollToDiv(divNumber: number) {
    let targetDivClass = ''
    if(divNumber === 1)
    {
      targetDivClass = '.newest-product';
    }else if(divNumber === 2){
      targetDivClass = ''
    }if(divNumber === 3){
      targetDivClass = '.sales-product'
    }
    const targetDivElement = this.el.nativeElement.querySelector(targetDivClass);

    if (targetDivElement) {
      const yOffset = targetDivElement.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: yOffset, behavior: 'smooth' });
    }
  }
}
