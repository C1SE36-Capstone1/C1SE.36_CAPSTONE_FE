import { Component, OnInit } from '@angular/core';
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

  productList: Product[];
  categoryList: Category[];
  showAll = false;
  show = true;


  constructor(private category : CategoryService,
              private product : ProductService) { }

  ngOnInit(): void {
    this.category.getAll().subscribe((result) =>{
      console.warn(result);
      if(result){
        this.categoryList = result;
      }
    });
    this.product.getAll().subscribe((result)=>{
      console.warn(result);
      if(result){
        this.productList = result;
      }
    })
  }
  showAllCategories(): void {
    // Set showAll to true to display all categories
    this.showAll =! this.showAll;
    this.show =! this.show;

  }

}
