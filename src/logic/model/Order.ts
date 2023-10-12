import { CartItem } from "./CartItem";
import { User } from "./User";

export interface Order {
    id: number | string,
    user: User,
    basket: CartItem[],
    isPayed: boolean
}