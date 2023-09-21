import axios from "axios";
import { Food } from "../../model/Food";
import { IFoodRepository } from "../IFoodRepository";
import { GetAllDTO, getFoodsFromDTO } from "./getAllDTO";

const api_base_url = `http://localhost:1337/api`;
export class StrapiFoodRepository implements IFoodRepository {
    create(food: Food): Promise<Food> {
        throw new Error("Method not implemented.");
    }
    async getAll(): Promise<Food[] | null> {
        try {
            const response = await axios.get(`${api_base_url}/foods`);
            const dto: GetAllDTO = response.data;
            return getFoodsFromDTO(dto);  
        } catch (error: any) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
              } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
              } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
              }
              console.log(error.config);
              return null;
        }
        // throw new Error("Method not implemented.");
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