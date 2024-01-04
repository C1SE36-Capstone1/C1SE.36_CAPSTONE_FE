import { Role } from "./role";

export interface User {
    userId?: number;
    name?: string;
    email?: string;
    password?: string;
    phone?: string;
    address?: string;
    birthdate?: Date;
    gender?: boolean;
    image?: string;
    registerDate?: Date;
    status?: boolean;
    token?: string;
    role?: Role;
}