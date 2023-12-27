export interface JwtResponse {
  token?: string;
  id?: string;
  name?: string;
  email?: string;
  password?: string;
  phone?: string;
  address?: string;
  gender?: boolean;
  status?: boolean;
  image?: string;
  registerDate?: Date;
  role?: string[];
}
