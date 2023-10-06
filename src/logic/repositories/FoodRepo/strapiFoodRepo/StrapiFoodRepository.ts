import axios from "axios";
import { FoodPayload, IFoodRepository } from "../IFoodRepository";
import { GetAllDTO, GetOneDTO, formatDataFromFood, getFoodsFromDTO, getOneFoodFromDTO } from "./getAllDTO";
import { Food } from "../../../model/Food";

const api_base_url = `http://localhost:1337/api`;
export class StrapiFoodRepository implements IFoodRepository {
    getOnebyTitle(title: String): Promise<Food | null> {
        throw new Error("Method not implemented.");
    }
    getOnebyId(id: number | String): Promise<Food | null> {
        throw new Error("Method not implemented.");
    }
    async create(food: FoodPayload): Promise<Food | null> {
        try {
            const response = await axios.post(`${api_base_url}/foods`, { data: formatDataFromFood(food) });
            const newFood: GetOneDTO = response.data;
            return Promise.resolve(getOneFoodFromDTO(newFood));
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
    // getOne(title: String): Promise<Food | null> {
    //     throw new Error("Method not implemented.");
    // }
    async delete(id: String): Promise<boolean> {
      try {
        const response = await axios.delete(`${api_base_url}/foods/${id}`);
        if (response) {
          return Promise.resolve(true);      
        }
        return Promise.resolve(false);
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
          return Promise.resolve(false);
    }
    }
    async update(id: String, data: FoodPayload): Promise<Food | null> {
        try {
            const response = await axios.put(`${api_base_url}/foods/${id}`, { data: formatDataFromFood(data) });
            const newFood: GetOneDTO = response.data;
            return Promise.resolve(getOneFoodFromDTO(newFood));
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
    }
    
}