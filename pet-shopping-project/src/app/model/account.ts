import { Account_role } from "./account-role";

export interface Account {
  id: number;
  isEnable: boolean;
  username: string;
  password: string;
  role: Account_role[];
}
