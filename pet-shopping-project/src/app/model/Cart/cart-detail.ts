// <<<<<<< dev-tam
// import { Pet } from "../Pet/pet";
// import { Product } from "../Product/product";
// import { Cart } from "./cart";

// export interface CartDetail {
//     cartDetailId?: number;
//     quantity?: number;
//     price?: number;
//     product?: Product;
//     cart?: Cart;
//     pet?: Pet;
// }
// =======
// cart-detail.ts

import { Product } from '../Product/product';
import { Cart } from './cart';
import { Pet } from '../Pet/pet';

export class CartDetail {

  cartDetailId?: number;
  quantity?: number;
  status?: boolean;
  cartId?: number;
  product?: Product;
  pet?: Pet;

  constructor(cartDetailId?: number, quantity?: number, price?: number, product?: Product, cart?: { cartId?: number }, pet?: Pet) {
    this.cartDetailId = cartDetailId;
    this.quantity = quantity;
    this.product = product;
    this.pet = pet;
  }
}
// >>>>>>> main
