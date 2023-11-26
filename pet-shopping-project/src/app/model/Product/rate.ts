import { OrderDetail } from "../Order/order-detail";

export interface Rate {
    id?: number;
    rating?: number;
    comment?: string;
    orderDetal?: OrderDetail;
}