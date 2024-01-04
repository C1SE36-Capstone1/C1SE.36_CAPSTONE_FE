import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Product } from 'src/app/model/Product/product';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  
  @Input() product: Product;

  constructor(public activeModal: NgbActiveModal) {}

  closeModal(): void {
    this.activeModal.close();
  }
  ngOnInit(): void {
  }

}
