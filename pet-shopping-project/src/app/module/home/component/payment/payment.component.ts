// payment.component.ts
import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/Cart/cart.service';
import { CartDetail } from 'src/app/model/Cart/cart-detail';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
processPayment() {
throw new Error('Method not implemented.');
}
  cartDetails: CartDetail[] = [];
  totalCartCost: number = 0;
  
  // Thêm các trường thông tin khách hàng tại đây
  customer = {
    fullName: '',
    email: '',
    phone: '',
    address: '',
  };

  constructor(
    private cartService: CartService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getCartDetails();
  }

  getCartDetails() {
    // Lấy chi tiết giỏ hàng từ service
    // ...

    // Sau khi lấy được chi tiết giỏ hàng, tính tổng giá trị giỏ hàng
    this.calculateTotalCartCost();
  }
  getTotalCartCost(): number {
    return this.cartDetails.reduce((total, detail) => total + detail.price * detail.quantity, 0);
  }
  calculateTotalCartCost() {
    // Tính tổng giá trị giỏ hàng
    // ...
  }

  checkout() {
    // Gửi thông tin đơn hàng và thông tin khách hàng đến server để xử lý thanh toán
    // Có thể sử dụng một service hoặc gọi API tại đây
    // ...

    // Sau khi thanh toán thành công, có thể thực hiện các bước như:
    // - Hiển thị thông báo thanh toán thành công
    // - Cập nhật trạng thái giỏ hàng
    // - Chuyển hướng người dùng đến trang cảm ơn hoặc trang tổng kết đơn hàng
    // ...

    this.showSuccessMessage('Thanh toán thành công');
  }

  private showSuccessMessage(message: string): void {
    this.snackBar.open(message, 'Đóng', {
      duration: 3000,
    });
  }
}
