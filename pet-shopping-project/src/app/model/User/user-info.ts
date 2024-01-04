import { Cart } from "../Cart/cart";

export interface UserInfo {
    userId?: number;
    code?: string;
    name?: string;
    email?: string;
    phone?: string;
    password?: string;
    address?: string;
    birthday?: Date;
    gender?: boolean;
    image?: string;
    status?: boolean;
    token?: string;
    cart?: Cart;
    role?: string[];
}
