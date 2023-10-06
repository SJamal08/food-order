import { Food } from "./Food";

export interface CartItem {
    food: Food,
    quantity: number,
    size: string
}