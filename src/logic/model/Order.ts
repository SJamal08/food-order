import { CartItem } from "./CartItem";

export interface Order {
    id: number | string,
    idUser: number | string,
    basket: CartItem[]
}