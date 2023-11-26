import { User } from "../User/user";
import { Product } from "./product";

export interface favorite {
    favorute?: number;
    user?: User;
    product?: Product;
}