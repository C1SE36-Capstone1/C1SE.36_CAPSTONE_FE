import { Component, Input, OnInit } from '@angular/core';
import { CategoryService } from '../../../../service/Product/category.service';
import { Category } from '../../../../model/Product/category';
import { ProductService } from 'src/app/service/Product/product.service';
import { Product } from 'src/app/model/Product/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  selectedCategoryId: number;

  productList: Product[];
  categoryList: Category[];
  displayedProducts: Product[];
  showAll = false;
  show = true;
  totalProducts: number = 0;
  productsPerPage: number = 9;
  currentPage: number = 1;
  sortType: string ='';
  sortOrder: string = '';

  constructor( private router: Router,
               private category : CategoryService,
               private product : ProductService) { }

  ngOnInit(): void {
    this.category.getAll().subscribe((result) =>{
      this.categoryList = result;
    });

    this.product.getAll().subscribe((data)=> {
      this.productList = data
      this.totalProducts = this.productList.length;
      this.displayedProducts = this.getProductSlice();
    })
  }

  showAllCategories(): void {
    this.showAll =! this.showAll;
    this.show =! this.show;
  }

  onCategoryClick(categoryId: number): void {
    this.selectedCategoryId = categoryId;

    // Gọi phương thức getByCategory và cập nhật danh sách sản phẩm
    if(categoryId){
      this.product.getByCategory(categoryId).subscribe(
        (data) => {
          this.productList = data;
          this.totalProducts = this.productList.length;
          this.displayedProducts = this.getProductSlice();
        },
        (error) => {
          console.error('Error fetching products by category:', error);
        }
      );
    }else{
      this.product.getAll().subscribe((data) =>{
        this.productList = data
        this.totalProducts = this.productList.length;
        this.displayedProducts = this.getProductSlice();
      })
    }
  }

  getProductSlice(): Product[] {
    const startIndex = (this.currentPage - 1 ) * this.productsPerPage;
    const endIndex = startIndex + this.productsPerPage;
    return this.productList.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    console.log('Changing to page:', page);
    this.currentPage = page;
    this.displayedProducts = this.getProductSlice();
  }

  getPageArray(): number[] {
    const pageCount = Math.ceil(this.totalProducts / this.productsPerPage);
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }

  sortProducts() {
    this.productList.sort((a, b) => {
      if (this.sortType === 'asc') {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
  }

  toggleSort(sort: string) {
    if(sort === 'asc'){
      this.sortType = 'asc';
      this.sortProducts();
      this.totalProducts = this.productList.length;
      this.displayedProducts = this.getProductSlice();
    }else{
      this.sortType = 'desc';
      this.sortProducts();
      this.totalProducts = this.productList.length;
      this.displayedProducts = this.getProductSlice();
    }
  }

  getSortButtonText(): string {
    if(this.sortType=== 'asc')
      return 'Giá từ thấp đến cao'
    else if(this.sortType=== 'desc')
      return 'Giá từ cao xuống thấp'
    else 
      return 'Sắp xếp sản phẩm'
  }

  redirectToProductDetail(productId: number): void {
    this.router.navigate(['shop/', productId]);
  }
}


