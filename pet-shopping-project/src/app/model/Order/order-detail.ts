import { Pet } from "../Pet/pet";
import { Product } from "../Product/product";
import { Order } from "./order";

export interface OrderDetail {
    orderDetailId?: number;
    quantity?: number;
    price?: number;

    product?: Product;
    order?: Order;
    pet?: Pet;
}