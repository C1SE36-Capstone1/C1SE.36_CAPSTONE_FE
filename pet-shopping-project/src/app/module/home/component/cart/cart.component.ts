
// Trong cart.component.ts

import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/Cart/cart.service';
import { Product } from 'src/app/model/Product/product';
import { CartDetail } from 'src/app/model/Cart/cart-detail';
import { Cart } from '../../../../model/Cart/cart';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartDetails: CartDetail[] = [];
  cartId: number = 1; // Thay đổi giá trị này tùy thuộc vào id của giỏ hàng bạn muốn hiển thị
  totalCartCost: number = 0;

  constructor(
    private cartService: CartService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getCartDetails();
  }

  getCartDetails() {
      this.cartService.getCartDetails(this.cartId).subscribe(
        (response) => {
          this.cartDetails = response;
          this.calculateTotalCartCost();
          console.log('Danh sách chi tiết giỏ hàng:', this.cartDetails);
        },
        (error) => {
          console.error('Lỗi khi lấy chi tiết giỏ hàng', error);
        }
      );
    }
    addToCart(product: Product): void {
      const cartDetail: CartDetail = {
        cartDetailId: 0,
        product: product,
        quantity: 1,
        price: product.price,
        cart: {
          cartId: 1,
        },
      };

      this.cartService.addToCart(cartDetail).subscribe(
        (response) => {
          console.log('Thêm vào giỏ hàng thành công', response);
          this.getCartDetails();
          this.showSuccessMessage('Thêm vào giỏ hàng thành công'); // Hiển thị thông báo
        },
        (error) => {
          console.error('Lỗi khi thêm vào giỏ hàng', error);
        }
      );
    }

    private showSuccessMessage(message: string): void {
      this.snackBar.open(message, 'Đóng', {
        duration: 3000, // Độ dài hiển thị (ms)
      });
    }


    updateCartDetail(detail: CartDetail) {
      this.cartService.updateCartDetail(detail).subscribe(
        (response) => {
          console.log('Cập nhật chi tiết giỏ hàng thành công', response);
          this.getCartDetails();
        },
        (error) => {
          console.error('Lỗi khi cập nhật chi tiết giỏ hàng', error);
        }
      );
    }
    deleteCartDetail(id: number) {
      this.cartService.deleteCartDetail(id).subscribe(
        () => {
          console.log('Xóa chi tiết giỏ hàng thành công');
          this.getCartDetails();
        },
        (error) => {
          console.error('Lỗi khi xóa chi tiết giỏ hàng', error);
        }
      );
    }

    calculateTotalCartCost() {
      this.totalCartCost = this.cartDetails.reduce(
        (total, detail) => total + detail.price * detail.quantity,
        0
      );
    }

    getTotalCartCost(): number {
      return this.cartDetails.reduce((total, detail) => total + detail.price * detail.quantity, 0);
    }

    checkout() {

    }

}
