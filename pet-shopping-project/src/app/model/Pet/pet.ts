import { Breed } from "./breed";
import { PetInfo } from "./petInfo";

export interface Pet {
    petId?: number;
    name?: string;
    petAge?: Date;
    price?: number;
    description?: string;
    enteredDate?: Date;
    gender?: string;
    status?: boolean;
    images?: string;
    code?: string;
    breed?: Breed;
    petInfo?: PetInfo;
}