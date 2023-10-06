import { Order } from "../model/Order";
import { IOrderRepository, OrderPayload } from "../repositories/OrderRepo/IOrderRepo";

export class Ordercontroller {
    private orderRepository: IOrderRepository;

    constructor(orderRepository: IOrderRepository) {
        this.orderRepository = orderRepository;
    }

    async getAll(): Promise<Order[] | null> {
        return await this.orderRepository.getAll();
    }

    async create(order: OrderPayload): Promise<Order | null> {
        return await this.orderRepository.create(order);
    }

    async update(id: number | string, order: OrderPayload): Promise<Order | null> {
        return await this.orderRepository.update(id, order);
    }

    async delete(id: string | number): Promise<boolean> {
        return await this.orderRepository.delete(id);
    }
}