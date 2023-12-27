import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Product } from 'src/app/model/Product/product';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  @Input() product: Product;
  editedProduct: Product;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {
    this.editedProduct = { ...this.product };
  }

  closeModal(): void {
    this.activeModal.close();
  }

  saveChanges(): void {
    this.activeModal.close(this.editedProduct);
  }

}
