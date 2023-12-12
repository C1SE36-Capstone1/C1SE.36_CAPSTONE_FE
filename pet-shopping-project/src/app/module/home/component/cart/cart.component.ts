// Trong cart.component.ts

import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/Cart/cart.service';
import { Product } from 'src/app/model/Product/product';
import { ThongBaoService } from 'src/app/service/Thongbao/thongbao.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  shoppingCart: Product[] = [];
  totalProductCosts: number[] = [];
  totalCartCost: number = 0;

  constructor(
    private cartService: CartService,
    private thongBaoService: ThongBaoService
  ) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.shoppingCart = this.cartService.getShoppingCart();
    this.calculateCosts();
  }

  removeFromCart(productId: number): void {
    this.cartService.removeFromCart(productId);
    this.calculateCosts();
  }

  updateCartItem(product: Product): void {
    const existingProduct = this.cartService.getCartItemById(product.productId);
    if (existingProduct) {
      this.cartService.updateCartItem(product);
      this.calculateCosts();
      this.showNotification('Đã cập nhật giỏ hàng');
    }
  }

  calculateCosts(): void {
    this.totalProductCosts = this.shoppingCart.map((item) => item.price * item.quantity);
    this.totalCartCost = this.totalProductCosts.reduce((acc, cost) => acc + cost, 0);
  }

  checkout(): void {
    // Thực hiện chức năng thanh toán (chuyển tới trang thanh toán hoặc thêm logic thanh toán ở đây)
    this.showNotification('Đã thanh toán!');
  }

  private showNotification(message: string): void {
    this.thongBaoService.hienThongBao(message);
  }

  getTotalCartCost(): number {
    return this.shoppingCart.reduce((total, item) => total + item.price * item.quantity, 0);
  }
}
