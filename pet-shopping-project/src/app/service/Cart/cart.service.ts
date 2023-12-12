// cart.service.ts

import { Injectable } from '@angular/core';
import { Product } from 'src/app/model/Product/product';
import { ThongBaoService } from '../Thongbao/thongbao.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private shoppingCart: Product[] = [];

  constructor(private thongBaoService: ThongBaoService){}

  getShoppingCart(): Product[] {
    return this.shoppingCart;
  }

  addToCart(product: Product): void {
    product.quantity = 1;
    this.shoppingCart.push(product);
    this.thongBaoService.hienThongBao('Đã thêm vào giỏ hàng');
  }

  removeFromCart(productId: number): void {
    const index = this.shoppingCart.findIndex((p) => p.productId === productId);
    if (index !== -1) {
      this.shoppingCart.splice(index, 1);
    }
  }

  getCartItemById(productId: number): Product | undefined {
    return this.shoppingCart.find((p) => p.productId === productId);
  }

  updateCartItem(product: Product): void {
    const index = this.shoppingCart.findIndex((p) => p.productId === product.productId);
    if (index !== -1) {
      this.shoppingCart[index] = product;
    }
  }
}
