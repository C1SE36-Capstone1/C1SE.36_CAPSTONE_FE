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

  selectedCategory: number;
  catId : number;
  productList : Product[];
  categoryList : Category [];

  constructor( private product : ProductService,
               private category : CategoryService) { }

  ngOnInit(): void {
    this.category.getAll().subscribe((data) => {
      this.categoryList = data
    })

    this.loadProduct();
  }
  loadProduct() :void{
    this.product.getAll().subscribe((data) =>
      this.productList = data
    )
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
      });
    }
    else {
      this.product.getAll().subscribe((data) => {
        this.productList = data
      })
    }
  }
}
