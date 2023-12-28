// payment.component.ts
import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/Cart/cart.service';
import { CartDetail } from 'src/app/model/Cart/cart-detail';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from 'src/app/service/Payment/payment.service';
import Swal from 'sweetalert2';
import { CartWithDetail } from 'src/app/model/Cart/cart-with-detail';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  rf: FormGroup;
  cart: any;
  totalAmount: number;
  txnRef: string;
  status: string;
  paymentMethod = 'direct';
  allChecked: boolean = false;
  details?: CartDetail[];

  constructor(
              private cartService: CartService,
              private snackBar: MatSnackBar,
              private activatedRoute: ActivatedRoute,
              private paymentService: PaymentService,
              private router: Router
  ) { this.activatedRoute.queryParams.subscribe(params => {
    this.totalAmount = params['vnp_Amount'];
    this.txnRef = params['vnp_TxnRef'];
    this.status = params['vnp_TransactionStatus'];
    let message: string;
    if (this.status == '00') {
      this.paymentService.transactionSuccess(this.txnRef).subscribe();
      message = 'Thanh toán thành công';
      this.alertAndNavigate(message);
    } else {
      this.paymentService.transactionFail(this.txnRef).subscribe();
      message = 'Thanh toán thất bại'
    }
  });}

  alertAndNavigate(message: string) {
    let timerInterval;
    Swal.fire({
      title: message,
      html: 'Đang chuyển về trang chủ',
      timer: 3000,  
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const b = Swal.getHtmlContainer().querySelector('b');
        timerInterval = setInterval(() => {
          b.textContent = String(Swal.getTimerLeft() / 1000);
        }, 1000);
      },
      willClose: () => {
        clearInterval(timerInterval);
      }
    }).then((result) => {
      this.router.navigateByUrl('');
    });
  }
  
  ngOnInit(): void {
    this.loadCartDetails();
  }

  loadCartDetails(): void {
    this.cartService.getCart().subscribe(
      cartWithDetail => {
        this.cart = cartWithDetail.cartDetailList;
        this.calculateTotalAmount();
      },
      error => {
        console.error('Lỗi khi tải thông tin giỏ hàng:', error);
        this.snackBar.open('Không thể tải thông tin giỏ hàng', 'Đóng', {
          duration: 3000,
        });
      }
    );
  }

  calculateTotalAmount(): void {
    this.totalAmount = this.cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }

  save() {
    this.cartService.updateCart(this.prepareCartForSendingToBackend()).subscribe(next => {
      Swal.fire({
        title: 'Đã huỷ!',
        text: 'Đã huỷ thao tác, quay về trang chính',
        icon: 'info',
        confirmButtonText: 'Cool'
      });
      this.router.navigateByUrl('/');
    });
  }

  checkout() {
    if (this.paymentMethod === 'direct') {
      this.cartService.checkout(this.prepareCartForSendingToBackend()).subscribe(next => {
        Swal.fire({
          title: 'Thành công!',
          text: 'Đã đặt hàng thành công, xin cảm ơn',
          icon: 'success',
          confirmButtonText: 'Cool'
        });
        this.router.navigateByUrl('/');
      });
    } else {
      this.paymentService.getPaid(this.prepareCartForSendingToBackend()).subscribe(next => {
        const url = next.url;
        window.location.href = url;
      });
    }
  }

  prepareCartForSendingToBackend(): CartWithDetail {
    this.cart.User.name = this.rf.value.name;
    this.cart.address = this.rf.value.address;
    this.cart.phone = this.rf.value.phone;
    this.cart.email = this.rf.value.email;
    const cartWithDetail: CartWithDetail = {cart: this.cart, cartDetailList: this.details};
    cartWithDetail.cartDetailList = this.details;
    cartWithDetail.cart = this.cart;
    return cartWithDetail;
  }


  changeMethod(e) {
    this.paymentMethod = e.target.value;
  }
}

