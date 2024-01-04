
// payment.component.ts
import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/Cart/cart.service';
import { CartDetail } from 'src/app/model/Cart/cart-detail';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from 'src/app/service/Payment/payment.service';
import Swal from 'sweetalert2';
import { CartWithDetail } from 'src/app/model/Cart/cart-with-detail';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/service/User/user.service';
import { Cart } from 'src/app/model/Cart/cart';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {

  paymentForm: FormGroup;
  cart: Cart; // Khởi tạo mảng rỗng
  details: CartDetail[];
  totalAmount: number;
  txnRef: string;
  status: string;
  queryParamsSubscription: Subscription; // Biến quản lý subscription
  paymentMethod = '1';

  constructor(
    private cartService: CartService,
    private snackBar: MatSnackBar,
    private paymentService: PaymentService,
    private router: Router,
    private userService: UserService,
    private activatedRoute:ActivatedRoute,
  ) { 
  }
  alertAndNavigate(message: string) {
    let timerInterval;
    Swal.fire({
      title: message,
      html: 'Đang chuyển về trang chủ',
      timer: 3000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        // const b = Swal.getHtmlContainer().querySelector('b');
        // timerInterval = setInterval(() => {
        //   b.textContent = String(Swal.getTimerLeft() / 1000);
        // }, 1000);
      },
      willClose: () => {
        clearInterval(timerInterval);
      }
    }).then((result) => {
      this.router.navigateByUrl('');
    });
  }



  ngOnInit(): void {
    this.initForm();
    this.loadCartDetails();
    this.loadUserInfo();
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['vnp_Amount'] && params['vnp_TxnRef'] && params['vnp_TransactionStatus']) {
        this.checkPaymentStatus();
      } 
    });
  }

  checkPaymentStatus(): void{
    this.activatedRoute.queryParams.subscribe(params => {
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
    });
  }


  initForm() {
    // Khởi tạo form với các trường rỗng hoặc giá trị mặc định
    this.paymentForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      paymentMethod: new FormControl(this.paymentMethod, Validators.required)
    });
  }

  loadCartDetails(): void {
    this.cartService.getCart().subscribe(
      cartWithDetail => {
        this.cart = cartWithDetail.cart;
        this.details = cartWithDetail.cartDetailList;
        this.calculateTotalAmount();
      },
      error => {
        console.error('Lỗi khi tải thông tin giỏ hàng:', error);
        this.snackBar.open('Không thể tải thông tin giỏ hàng', 'Đóng', { duration: 3000 });
      }
    );
  }
  

  loadUserInfo(): void {
    this.userService.getUser().subscribe(userInfo => {
      // Cập nhật form với thông tin người dùng
      this.paymentForm.patchValue({
        name: userInfo.name,
        email: userInfo.email,
        phone: userInfo.phone,
        address: userInfo.address
      });
    });
  }

  ngOnDestroy(): void {
    if (this.queryParamsSubscription) {
      this.queryParamsSubscription.unsubscribe();
    }
  }


  calculateTotalAmount(): void {
    if (this.details && this.details.length > 0) {
      this.totalAmount = this.details.reduce((total, item) => total + item.product.price * item.quantity, 0);
    }
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
    console.log(this.prepareCartForSendingToBackend());
    this.cartService.checkout(this.prepareCartForSendingToBackend()).subscribe({
      next: (response) => {
        Swal.fire({
          title: 'Thành công!',
          text: 'Đã đặt hàng thành công, xin cảm ơn',
          icon: 'success',
          confirmButtonText: 'Cool'
        });
        this.router.navigateByUrl('/');
      },
      error: (err) => {
        console.error('Lỗi khi thanh toán:', err);

        // Xử lý dựa trên lỗi cụ thể
        let errorMessage = 'Đã xảy ra lỗi khi thực hiện thanh toán.';
        if (err.error && err.error.message) {
          // Sử dụng thông báo lỗi từ server nếu có
          errorMessage = err.error.message;
        } else if (err.status === 0) {
          // Lỗi mạng hoặc không kết nối được với server
          errorMessage = 'Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng của bạn.';
        } else if (err.status === 401) {
          // Lỗi xác thực, ví dụ không có quyền
          errorMessage = 'Bạn không có quyền thực hiện hành động này.';
        } // Thêm các trường hợp lỗi khác nếu cần

        // Hiển thị thông báo lỗi
        Swal.fire({
          title: 'Lỗi!',
          text: errorMessage,
          icon: 'error',
          confirmButtonText: 'Đóng'
        });
      }
    });

  }


  onCheckout(): void {
    if (this.paymentForm.valid) {
      if (this.paymentForm.value.paymentMethod === '1') {
        this.confirmAndCheckout();
      } else if (this.paymentForm.value.paymentMethod === '2') {
        const cartData = this.prepareCartForSendingToBackend();
        this.paymentService.getPaid(cartData).subscribe({
          next: (response) => {
            window.location.href = response.url;
            
          },
          error: (error) => {
            Swal.fire('Lỗi', 'Không thể thực hiện thanh toán qua VnPay. Vui lòng thử lại.', 'error');
          }
        });
      }
    } else {
      Object.keys(this.paymentForm.controls).forEach(field => {
        const control = this.paymentForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    }
  }
  
  

  confirmAndCheckout() {
    Swal.fire({
      title: 'Xác nhận thanh toán',
      text: "Bạn có chắc chắn muốn thanh toán?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Có, thanh toán ngay!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.checkout();
      }
    });
  }

  prepareCartForSendingToBackend(): CartWithDetail {
    const formValues = this.paymentForm.value;
    // Cập nhật thông tin giỏ hàng từ form
    const cartWithDetail: CartWithDetail = {
      cart: {
        cartId: this.cart.cartId,
        address: formValues.address || this.cart.address,
        phone: formValues.phone || this.cart.phone,
        Amount: this.totalAmount
      },
      cartDetailList: this.details.map(item => ({
        cartDetailId: item.cartDetailId,
        quantity: item.quantity,
        product: item.product,
        cartId: this.cart.cartId,
        status: item.status,
        pet: item.pet 
      }))
    };
    return cartWithDetail;
  }

  changeMethod(e) {
    this.paymentMethod = e.target.value;
    this.paymentForm.get('paymentMethod').setValue(this.paymentMethod);
  }
}
