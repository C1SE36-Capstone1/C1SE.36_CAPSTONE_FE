
// Trong cart.component.ts
import { PaymentService } from 'src/app/service/Payment/payment.service';
import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/Cart/cart.service';
import { Product } from 'src/app/model/Product/product';
import { CartDetail } from 'src/app/model/Cart/cart-detail';
import { Cart } from '../../../../model/Cart/cart';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartId: number = 1; // Thay đổi giá trị này tùy thuộc vào id của giỏ hàng bạn muốn hiển thị
  totalCartCost: number = 0;
  rf: FormGroup;
  cart?: Cart;
  details?: CartDetail[];
  constructor(
    private cartService: CartService,
    private snackBar: MatSnackBar,
    private paymentservice: PaymentService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getCart();
  }

  formBuilder() {
    this.rf = new FormGroup({
      address: new FormControl(this.cart.address, [Validators.required, Validators.pattern('^[^!@#$%^&*()_+<>?\'\"{}\\`~|/\\\\]+$')]),
      phone: new FormControl(this.cart.phone, [Validators.required, Validators.pattern('^0\\d{9,10}')]),
      amount: new FormControl(this.cart.amount, [Validators.required, Validators.pattern('')])
    });
  }

  // getCart() {
  //   this.cartService.getCart().subscribe(next => {
  //     this.cart = next.cart;
  //     this.details = next.cartDetailList;
  //     this.formBuilder();
  //     console.log(this.details);

  //   }, error => alert('Lỗi rồi đó'));
  // }
  getCart() {
    this.cartService.getCart().subscribe(
      next => {
        this.cart = next.cart;
        this.details = next.cartDetailList;
        this.formBuilder();
        console.log('Details received:', this.details);
      },
      error => alert('Lỗi rồi đó')
    );
  }


  addToCart(productId: number) {
    let flag = false;
    this.details.forEach(value => {
      if (value.product.productId === productId) {
        flag = true;
      }
    });
    if (flag) {
      Swal.fire('Lưu ý', 'Sản phẩm đã có trong giỏ', 'info');
    } else {
      this.cartService.addToCart(productId).subscribe(next => {
        this.getCart(); // Cập nhật thông tin giỏ hàng sau khi thêm
        Swal.fire('Thành công', 'Đã thêm sản phẩm vào giỏ', 'success');
      });
    }
  }
h


    private showSuccessMessage(message: string): void {
      this.snackBar.open(message, 'Đóng', {
        duration: 3000, // Độ dài hiển thị (ms)
      });
    }


    updateCartDetail(detail: CartDetail) {
      this.cartService.updateCartDetail(detail).subscribe(
        (response) => {
          console.log('Cập nhật chi tiết giỏ hàng thành công', response);
          this.getCart();
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
          this.getCart();
        },
        (error) => {
          console.error('Lỗi khi xóa chi tiết giỏ hàng', error);
        }
      );
    }

    calculateTotalCartCost() {
      this.totalCartCost = this.details.reduce(
        (total, detail) => total + detail.price * detail.quantity,
        0
      );
    }

    getTotalCartCost(): number {
      return this.details.reduce((total, detail) => total + detail.price * detail.quantity, 0);
    }

    checkout() {
      const cartId = this.cartId;
      this.paymentservice.processPayment(cartId).subscribe(
        () => {
          this.router.navigate(['/payment']);
        },
        (error) => {
          console.error('Lỗi thanh toán', error);
        }
      );
    }
    goToPaymentPage() {
      this.router.navigate(['/payment']);
    }
}
