// cart-detail.ts

import { Product } from '../Product/product';
import { Cart } from './cart';
import { Pet } from '../Pet/pet';

export class CartDetail {

  cartDetailId?: number;
  quantity?: number;
  price?: number;

  product?: Product;
  cart?: {
    cartId?: number; // Đảm bảo thuộc tính cartId có giá trị
  };
  pet?: Pet;

  constructor(cartDetailId?: number, quantity?: number, price?: number, product?: Product, cart?: { cartId?: number }, pet?: Pet) {
    this.cartDetailId = cartDetailId;
    this.quantity = quantity;
    this.price = price;
    this.product = product;
    this.cart = cart;
    this.pet = pet;
  }
}
