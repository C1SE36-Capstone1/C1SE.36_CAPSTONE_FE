import { Component, Input, OnInit } from '@angular/core';
import { CategoryService } from '../../../../service/Product/category.service';
import { Category } from '../../../../model/Product/category';
import { ProductService } from 'src/app/service/Product/product.service';
import { Product } from 'src/app/model/Product/product';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  selectedCategoryId: number;

  productList: Product[];
  categoryList: Category[];
  showAll = false;
  show = true;
  totalProducts: number = 0;
  productsPerPage: number = 12;
  currentPage: number = 1;

  constructor(private category : CategoryService,
              private product : ProductService) { }

  ngOnInit(): void {
    this.category.getAll().subscribe((result) =>{
      console.warn(result);
      if(result){
        this.categoryList = result;
      }
    });
    this.product.getAll().subscribe((data)=> {
      this.productList = data
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
        },
        (error) => {
          console.error('Error fetching products by category:', error);
        }
      );
    }else{
      this.product.getAll().subscribe((data) =>{
        this.productList = data
      })
    }
    
  }

  getProductSlice(): Product[] {
    const startIndex = (this.currentPage - 1) * this.productsPerPage;
    const endIndex = startIndex + this.productsPerPage;
    return this.productList.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.productList = this.getProductSlice();
  }

  getPageArray(): number[] {
    const pageCount = Math.ceil(this.totalProducts / this.productsPerPage);
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }
}


