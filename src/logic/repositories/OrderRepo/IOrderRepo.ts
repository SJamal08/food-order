import { CartItem } from "../../model/CartItem";
import { Order } from "../../model/Order";

export interface OrderPayload {
    basket: CartItem[],
    idUser: number
}
export interface IOrderRepository {
    create(order:OrderPayload) : Promise<Order | null>,
    getAll() : Promise<Order[]|null>,
    getOnebyId(id : String | number) : Promise<Order|null>,
    delete(id : String | number) : Promise<boolean>,
    update(id : String | number,data : OrderPayload) :Promise<Order | null>,
}