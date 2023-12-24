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
    // Thực hiện các thay đổi cần thiết và đóng modal
    // Lưu ý: Bạn có thể thực hiện gọi API để cập nhật thông tin trên server tại đây
    // Sau đó đóng modal và làm mới danh sách sản phẩm hoặc làm thay đổi cần thiết
    this.activeModal.close(this.editedProduct);
  }

}
