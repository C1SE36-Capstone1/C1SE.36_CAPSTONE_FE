import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/model/Product/category';
import { Product } from 'src/app/model/Product/product';
import { CategoryService } from 'src/app/service/Product/category.service';
import { ProductService } from 'src/app/service/Product/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  selectedCategoryId: number;

  productList: Product[];
  categoryList: Category[];
  displayedProducts: Product[];
  showAll = false;
  show = true;
  totalProducts: number = 0;
  productsPerPage: number = 10;
  currentPage: number = 1;
  sortType: string ='';
  sortOrder: string = '';
  selectedCategory: number;
  catId : number;
  

  constructor( private product : ProductService,
               private category : CategoryService) { }

  ngOnInit(): void {
    this.category.getAll().subscribe((data) => {
      this.categoryList = data
    })
    this.loadProduct();
  }

  loadProduct() :void{
    this.product.getAll().subscribe((data) => {
      this.productList = data
      this.totalProducts = this.productList.length;
      this.displayedProducts = this.getProductSlice();
    })
  }

  refreshProductList(): void {
    this.product.getByCategory(this.catId).subscribe((data) => {
      this.productList = data;
    });
  }

  filterProducts() {
    if (this.selectedCategory) {
      this.product.getByCategory(this.selectedCategory).subscribe((data) => {
        this.productList = data;
        this.totalProducts = this.productList.length;
      this.displayedProducts = this.getProductSlice();
      });
    }
    else {
      this.product.getAll().subscribe((data) => {
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

  deleteProduct(id: number): void {
    this.product.deleteProductAtId(id)
      .subscribe(() => {
        // Handle successful deletion
        console.log('Product deleted successfully');
        this.loadProduct();
      }, error => {
        // Handle errors
        console.error('Error deleting product:', error);
      });
  }
}
