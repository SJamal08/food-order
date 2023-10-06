import { Food } from "../../model/Food";
import { FoodPayload, IFoodRepository } from "./IFoodRepository";

let foodList: Food[] = [
    {
      id: 0,
      title: "Clasico",
      description: "Mixed pizza with chesse",
      price: 7.99,
      calories: 238,
      // img: "https://ouaga-marketplace.netlify.app/static/media/pizza1.13d6e92744bd5699e9c4.png",
      img:"https://img.freepik.com/photos-premium/pizza-isolee-aux-champignons-olives_219193-8149.jpg"

    },
    {
      id: 1,
      title: "Clasico",
      description: "Mixed pizza with chesse",
      price: 7.99,
      calories: 238,
      // img: "https://ouaga-marketplace.netlify.app/static/media/pizza1.13d6e92744bd5699e9c4.png",
      img:"https://img.freepik.com/photos-premium/pizza-isolee-aux-champignons-olives_219193-8149.jpg"

    },
    {
      id: 2,
      title: "Clasico",
      description: "Mixed pizza with chesse",
      price: 7.99,
      calories: 238,
      // img: "https://ouaga-marketplace.netlify.app/static/media/pizza1.13d6e92744bd5699e9c4.png",
      img:"https://img.freepik.com/photos-premium/pizza-isolee-aux-champignons-olives_219193-8149.jpg"

    },
  ];

export class InMemoryFoodRepo implements IFoodRepository {
    getOnebyTitle(title: String): Promise<Food | null> {
      const searchFood = foodList.find(food => food.title === title);
      if (searchFood === undefined) {
        return Promise.resolve(null);
      }
      return Promise.resolve(searchFood); 
    }
    getOnebyId(id: string | number): Promise<Food | null> {
      const searchFood = foodList.find(food => food.id === id);
      if (searchFood === undefined) {
        return Promise.resolve(null);
      }
      return Promise.resolve(searchFood); 
    }

    create(food: FoodPayload): Promise<Food | null> {
      const lastId : number | string = foodList[foodList.length - 1].id;
      let id: number | string = 0;
      if(typeof lastId === "number")
        {
          id =  lastId +1;
        }
        const newFood = {
          id,
        ...food
        };
        // console.log("new food")
        // console.log(newFood);
        // foodList.push(newFood);
        return Promise.resolve(newFood);
    }
    getAll(): Promise<Food[] | null> {
        return Promise.resolve(foodList);
    }
    // getOne(title: String): Promise<Food | null> {
    //     throw new Error("Method not implemented.");
    // }
    delete(id: number | String): Promise<boolean> {
        // const index = foodList.findIndex(food => food.id === id);
        // console.log(index)

        // if (index !== -1) {
        //   const deletedFood = foodList.splice(index, 1);
        //   return Promise.resolve(true);
        // }
        foodList = foodList.filter((food: Food) => food.id !== id);
        return Promise.resolve(true);
    }
    update(id: string | number, data: FoodPayload): Promise<Food | null> {
      const index = foodList.findIndex(food => food.id === id);
      console.log(index)
      // foodList[index] = {id, ...data};
      return Promise.resolve({id, ...data});
    }

}