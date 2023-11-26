import { User } from "../User/user";

export interface Veterinarian {
    vetId?: number;
    vetName?: string;
    vetLicenseNumber?: string; //sô giấy phép thú y 
    vetAddress?: string;
    vetPhone?: string;
    description?: string;
    specialize?: string; //Chuyên môn
    status?: boolean;

    user?: User;
}