import { Food } from "../model/Food";

export interface IFoodRepository {
    create(food:Food) : Promise<Food>,
    getAll() : Promise<Food[]|null>,
    getOne(title : String) : Promise<Food|null>,
    delete(id : String) : Promise<boolean>,
    update(id : String,data : Food) :Promise<Food>,
}