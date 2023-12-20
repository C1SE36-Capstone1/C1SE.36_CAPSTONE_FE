
export interface JwtResponse {
    token?: string;
    user: {
        id?: string;
        name?: string;
        email?: string;
        password?: string;
        phone?: string;
        address?: string;
        gender?: boolean;
        status?: boolean;
        image?: string;
        registerDate?: Date; // Sử dụng Date thay vì Data
        role?: string[];
    };
}
