import { Pet } from "../Pet/pet";
import { Product } from "../Product/product";
import { Cart } from "./cart";

export interface CartDetail {
    cartDetailId?: number;
    quantity?: number;
    price?: number;
    product?: Product;
    cart?: Cart;
    pet?: Pet;
}