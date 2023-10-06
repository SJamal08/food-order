import axios from "axios";
import { Order } from "../../model/Order";
import { IOrderRepository, OrderPayload } from "./IOrderRepo";

// /api/orders
const api_base_url = `http://localhost:1337/api`;
export class StrapiOrderRepository implements IOrderRepository {
    async create(order: OrderPayload): Promise<Order | null> {
        try {
            const response = await axios.post(`${api_base_url}/orders`, {data: order});
            return Promise.resolve(response.data);
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
    getAll(): Promise<Order[] | null> {
        throw new Error("Method not implemented.");
    }
    getOnebyId(id: number | String): Promise<Order | null> {
        throw new Error("Method not implemented.");
    }
    delete(id: number | String): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    update(id: number | String, data: OrderPayload): Promise<Order | null> {
        throw new Error("Method not implemented.");
    }
    
}