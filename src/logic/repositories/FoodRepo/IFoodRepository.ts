import { Food } from "../../model/Food";

export interface FoodPayload {
    title: string,
    description:string,
    price: number,
    calories: number,
    img: string
}
export interface IFoodRepository {
    create(food:FoodPayload) : Promise<Food | null>,
    getAll() : Promise<Food[]|null>,
    getOnebyTitle(title : String) : Promise<Food|null>,
    getOnebyId(id : String | number) : Promise<Food|null>,
    delete(id : String | number) : Promise<boolean>,
    update(id : String | number,data : FoodPayload) :Promise<Food | null>,
}