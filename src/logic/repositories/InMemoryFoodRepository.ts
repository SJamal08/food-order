import { Food } from "../model/Food";
import { IFoodRepository } from "./IFoodRepository";

const foodList: Food[] = [
    {
      id: 0,
      title: "Clasico",
      description: "Mixed pizza with chesse",
      price: 7.99,
      calories: 238,
      img: "https://ouaga-marketplace.netlify.app/static/media/pizza1.13d6e92744bd5699e9c4.png"
    },
    {
      id: 1,
      title: "Clasico",
      description: "Mixed pizza with chesse",
      price: 7.99,
      calories: 238,
      img: "https://ouaga-marketplace.netlify.app/static/media/pizza1.13d6e92744bd5699e9c4.png"
    },
    {
      id: 2,
      title: "Clasico",
      description: "Mixed pizza with chesse",
      price: 7.99,
      calories: 238,
      img: "https://ouaga-marketplace.netlify.app/static/media/pizza1.13d6e92744bd5699e9c4.png"
    },
  ];

export class InMemoryFoodRepo implements IFoodRepository {

    
    create(food: Food): Promise<Food> {
        throw new Error("Method not implemented.");
    }
    getAll(): Promise<Food[] | null> {
        return Promise.resolve(foodList);
    }
    getOne(title: String): Promise<Food | null> {
        throw new Error("Method not implemented.");
    }
    delete(id: String): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    update(id: String, data: Food): Promise<Food> {
        throw new Error("Method not implemented.");
    }

}