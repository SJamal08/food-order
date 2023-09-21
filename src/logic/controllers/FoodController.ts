import { Food } from "../model/Food";
import { IFoodRepository } from "../repositories/IFoodRepository";

export class Foodcontroller {
    foodRepository: IFoodRepository;

    constructor(foodRepository: IFoodRepository) {
        this.foodRepository = foodRepository;
    }

    async getAll(): Promise<Food[] | null> {
        return await this.foodRepository.getAll();
    }
}