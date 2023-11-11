import { CartItem } from "../../model/CartItem";
import { Order } from "../../model/Order";
import { User } from "../../model/User";

export interface OrderPayload {
    basket: CartItem[],
    user: User,
    amount: number
}
export interface IOrderRepository {
    create(order:OrderPayload) : Promise<Order | null>,
    getAll() : Promise<Order[]|null>,
    getAllForOneUser(idUser: number | string): Promise<Order[] | null>,
    getOnebyId(id : String | number) : Promise<Order|null>,
    delete(id : String | number) : Promise<boolean>,
    update(id : String | number,data : any) :Promise<Order | null>,
}