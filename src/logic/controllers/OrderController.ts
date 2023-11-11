import { Order } from "../model/Order";
import { authController } from "../redux/reducers/AuthReducer";
import { IAuthRepo } from "../repositories/AuthRepo/IAuthRepo";
import { IOrderRepository, OrderPayload } from "../repositories/OrderRepo/IOrderRepo";

export class Ordercontroller {
    private orderRepository: IOrderRepository;
    // private authRepository: IAuthRepo;

    constructor(orderRepository: IOrderRepository) {
        this.orderRepository = orderRepository;
        // this.authRepository = authRepository;
    }

    async getAll(): Promise<Order[] | null> {
        return await this.orderRepository.getAll();
    }

    async getOneById(id: number): Promise<Order | null> {
        return await this.orderRepository.getOnebyId(id);
    }

    async getAllForOneUser(id: number | string): Promise<Order[] | null> {
        // const isAuthorized = await authController.isAuthorized(id);
        // if (isAuthorized) return null;
        return await this.orderRepository.getAllForOneUser(id);
    }

    async create(order: OrderPayload): Promise<Order | null> {
        return await this.orderRepository.create(order);
    }

    async update(id: number | string, order: any): Promise<Order | null> {
        return await this.orderRepository.update(id, order);
    }

    async delete(id: string | number): Promise<boolean> {
        return await this.orderRepository.delete(id);
    }
}