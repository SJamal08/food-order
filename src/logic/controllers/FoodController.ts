import { Food } from "../model/Food";
import { FoodPayload, IFoodRepository } from "../repositories/FoodRepo/IFoodRepository";

export class Foodcontroller {
    private foodRepository: IFoodRepository;

    constructor(foodRepository: IFoodRepository) {
        this.foodRepository = foodRepository;
    }

    async getAll(): Promise<Food[] | null> {
        return await this.foodRepository.getAll();
    }

    async create(food: FoodPayload): Promise<Food | null> {
        return await this.foodRepository.create(food);
    }

    async update(id: number | string, food: FoodPayload): Promise<Food | null> {
        return await this.foodRepository.update(id, food);
    }

    async delete(id: string | number): Promise<boolean> {
        return await this.foodRepository.delete(id);
    }
}