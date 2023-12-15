import { Data } from "@angular/router";

export interface JwtResponse {
    token?: string;
    type?: string;
    id?: string;
    name?: string;
    email?: string;
    password?: string;
    phone?: string;
    address?: string;
    gender?: boolean;
    status?: boolean;
    image?: string;
    registerDate?: Data;
    role?: string[];
}
