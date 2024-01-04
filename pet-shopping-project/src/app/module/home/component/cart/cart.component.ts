
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
import { CartWithDetail } from 'src/app/model/Cart/cart-with-detail';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  rf: FormGroup;
  cart?: Cart;
  details?: CartDetail[];
  total = 0;

  constructor(
    private cartService: CartService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getCart();
    this.formBuilder;
    this.calculateTotal();
  }

  private formBuilder() {
    this.rf = new FormGroup({
      address: new FormControl(this.cart.address, [Validators.required, Validators.pattern('^[^!@#$%^&*()_+<>?\'\"{}\\`~|/\\\\]+$')]),
      phone: new FormControl(this.cart.phone, [Validators.required, Validators.pattern('^0\\d{9,10}')]),
      amount: new FormControl(this.cart.Amount, [Validators.required, Validators.pattern('')])
    });
  }

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

  private showSuccessMessage(message: string) {
    this.snackBar.open(message, 'Đóng', {
      duration: 3000
    });
  }

  private showError(message: string) {
    Swal.fire('Lỗi', message, 'error');
  }

  calculateTotal() {
    this.total = this.details.reduce((acc, detail) => acc + (detail.product.price * detail.quantity), 0);
  }


  updateQuantity(cartDetailId: number, increment: boolean) {
    const detail = this.details.find(d => d.cartDetailId === cartDetailId);
    if (detail) {
      increment ? detail.quantity++ : detail.quantity--;
      this.calculateTotal();
      this.cartService.updateCart(this.prepareCartForSendingToBackend()).subscribe(
        () => this.showSuccessMessage('Cập nhật giỏ hàng thành công'),
        error => this.showError('Lỗi khi cập nhật giỏ hàng')
      );
    }
  }

    getTotalAmount() {
      let temp = 0;
      this.details.forEach(item => {
        if (item.status === true) {
          temp += item.quantity * item.product.price;
        }
      });
      this.total = temp;
    }

    deleteCartDetail(id: number) {
      this.cartService.deleteCartDetail(id).subscribe(
        () => {
          this.getCart();
          this.showSuccessMessage('Sản phẩm đã được xóa khỏi giỏ hàng');
        },
        error => this.showError('Lỗi khi xóa sản phẩm khỏi giỏ hàng')
      );
    }

    prepareCartForSendingToBackend(): CartWithDetail {
      this.cart.address = this.rf.value.receiverAddress;
      this.cart.phone = this.rf.value.receiverPhone;
      //this.cart.user.email = this.rf.value.receiverEmail;
      const cartWithDetail: CartWithDetail = {cart: this.cart, cartDetailList: this.details};
      cartWithDetail.cartDetailList = this.details;
      cartWithDetail.cart = this.cart;
      return cartWithDetail;
    }


    goToPaymentPage() {
      this.router.navigate(['/payment']);
    }
}