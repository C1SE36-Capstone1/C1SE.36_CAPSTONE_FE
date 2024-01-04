import { User } from "../User/user";
import { Product } from "./product";

export interface favorite {
    favorite?: number;
    user?: User;
    product?: Product;
}
