import { Category } from './category';
export interface Product {
    id: number;
    productId?: number;
    name?: string;
    code?: number;
    quantity?: number;
    price?: number;
    discount?: number;
    image?: string;
    description?: string;
    enteredDate?: Date;
    expireDate?: Date;
    status?: boolean;
    sold?: number;
    category?: Category;
}
