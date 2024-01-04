import { User } from "../User/user";

export interface Cart {
    cartId?: number;
    Amount?: number;
    address?: string;
    phone?: string;
    user?: User;
}
