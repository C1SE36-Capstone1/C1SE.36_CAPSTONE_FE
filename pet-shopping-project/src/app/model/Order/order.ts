import { User } from "../User/user";

export interface Order {
    ordersId?: number;
    orderDate?: Date;
    amount?: number;
    address?: string;
    phone?: string;
    status?: boolean;

    user?: User;
}