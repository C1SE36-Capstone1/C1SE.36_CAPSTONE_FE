import { Category } from './category';
export interface Product {
    productId?: number;
    name?: string;
    quantity?: number;
    price?: number; 
    discount?: number;
    image?: string;
    description?: string;
    enteredDate?: Date;
    status?: boolean;
    sold?: number;
    category?: Category;
}