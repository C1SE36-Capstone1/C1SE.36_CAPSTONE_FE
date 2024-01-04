import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Product } from 'src/app/model/Product/product';
import { CategoryService } from '../../../../../service/Product/category.service';
import { Category } from 'src/app/model/Product/category';
import { ProductService } from 'src/app/service/Product/product.service';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  @Input() product: Product;
  editedProduct: Product;
  categoryList : Category[];
  uploadedAvatar: any;

  constructor(public activeModal: NgbActiveModal,
              private categoryService: CategoryService,
              private productService: ProductService) {}

  ngOnInit(): void {
    this.editedProduct = { ...this.product };
    this.categoryService.getAll().subscribe(data =>{
      this.categoryList = data;
    })
  }

  closeModal(): void {
    this.activeModal.close();
  }

  saveChanges(): void {
    this.productService.updateProductAtId(this.editedProduct.productId, this.editedProduct)
      .subscribe(updatedProduct => {
        console.log('Product updated:', updatedProduct);
        this.activeModal.close(this.editedProduct);
      });
  }
}
