import { Cart } from "./cart";
import { CartDetail } from "./cart-detail";

export interface CartWithDetail {
  cart?: Cart;
  cartDetailList?: CartDetail[];
}
