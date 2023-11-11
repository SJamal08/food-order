import { Order } from "../../model/Order";
import { IOrderRepository, OrderPayload } from "./IOrderRepo";


export class InMemoryOrderRepo implements IOrderRepository {
    getAllForOneUser(idUser: string | number): Promise<Order[] | null> {
        throw new Error("Method not implemented.");
    }
    create(order: OrderPayload): Promise<Order | null> {
        throw new Error("Method not implemented.");
    }
    getAll(): Promise<Order[] | null> {
        throw new Error("Method not implemented.");
    }
    getOnebyId(id: number | String): Promise<Order | null> {
        throw new Error("Method not implemented.");
    }
    delete(id: number | String): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    update(id: number | String, data: OrderPayload): Promise<Order | null> {
        throw new Error("Method not implemented.");
    }

}