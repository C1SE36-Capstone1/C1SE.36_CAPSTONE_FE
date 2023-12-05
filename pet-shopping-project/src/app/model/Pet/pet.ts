import { Breed } from "./breed";
import { PetInfo } from "./petInfo";

export interface Pet {
    pet_id?: number;
    name?: string;
    petAge?: Date;
    price?: number;
    description?: string;
    enteredDate?: Date;
    gender?: string;
    status?: boolean;
    images?: string;

    breed?: Breed;
    petInfo?: PetInfo;
}