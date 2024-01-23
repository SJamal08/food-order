import { FoodPayload, IFoodRepository } from "../IFoodRepository";
import { GetAllDTO, GetOneDTO, formatDataFromFood, getFoodsFromDTO, getOneFoodFromDTO } from "./getAllDTO";
import { Food } from "../../../model/Food";
import { makeRequest } from "../../makeRequest";
import { API_BASE_URL } from "../../../../utils/constants";

const api_base_url = API_BASE_URL.strapiUrl;
export class StrapiFoodRepository implements IFoodRepository {
    getOnebyTitle(title: String): Promise<Food | null> {
        throw new Error("Method not implemented.");
    }
    getOnebyId(id: number | String): Promise<Food | null> {
        throw new Error("Method not implemented.");
    }
    async create(food: FoodPayload): Promise<Food | null> {
        const data: GetOneDTO = await makeRequest({
          method: "post",
          endpoint:`${api_base_url}/foods`,
          data: { data: formatDataFromFood(food) }});
        const newFood: GetOneDTO = data;
        return getOneFoodFromDTO(newFood);
    }
    async getAll(): Promise<Food[] | null> {
        const data: GetAllDTO = await makeRequest({
          method: 'get',
          endpoint:`${api_base_url}/foods`,
        });
        return getFoodsFromDTO(data);  
     
    }
    // getOne(title: String): Promise<Food | null> {
    //     throw new Error("Method not implemented.");
    // }
    async delete(id: String): Promise<boolean> {
      const data : boolean = await makeRequest({
        method: 'delete',
        endpoint:`${api_base_url}/foods/${id}`,
      });
      return data;  


    }
    
    async update(id: String, data: FoodPayload): Promise<Food | null> {
      const response = await makeRequest({
        method: 'put',
        endpoint:`${api_base_url}/foods/${id}`,
        data: { data: formatDataFromFood(data) }
      });
      const newFood: GetOneDTO = response;
            return getOneFoodFromDTO(newFood);
    }
    
}