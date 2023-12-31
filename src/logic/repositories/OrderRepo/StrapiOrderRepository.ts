import { Order } from "../../model/Order";
import { IOrderRepository, OrderPayload } from "./IOrderRepo";
import { makeRequest } from "../makeRequest";
import { getStrapiAuthHeaders } from "../AuthRepo/StrapiAuthRepo";
import { API_BASE_URL } from "../../../utils/constants";
import { buildArrayOfOrdersFromDTO, buildOrderFromDTO } from "./strapiDTOs/GetOneDTO";

const api_base_url = API_BASE_URL.strapiUrl
export class StrapiOrderRepository implements IOrderRepository {

    async getAllForOneUser(idUser: string | number): Promise<Order[] | null> {
        const all = await this.getAll();

        if (!all) return null;

        return all.filter((order: Order) => order.user.id === idUser);
    }


    async create(order: OrderPayload): Promise<Order | null> {
        const headers = getStrapiAuthHeaders();
        const newOrder = {...order, isPayed: false};
        const response = await makeRequest({
            method:'post',
            endpoint:`${api_base_url}/orders`,
            data: {data: newOrder},
            headers: headers});
        return response.data;
    }

    async getAll(): Promise<Order[] | null> {
        const headers = getStrapiAuthHeaders();
        // const newOrder = {...order, isPayed: false};
        try {
            const data = await makeRequest({
                method:'get',
                endpoint:`${api_base_url}/orders`,
                headers: headers});
            if(data == null) return null;
            // return buildOrderFromDTO(data);
            return buildArrayOfOrdersFromDTO(data);
            
        } catch (error) {
            console.log("error dans le getobeby")
            console.log(error)
            return null
            
        }
    }
    async getOnebyId(id: number | String): Promise<Order | null> {
        const headers = getStrapiAuthHeaders();
        // const newOrder = {...order, isPayed: false};
        try {
            const data = await makeRequest({
                method:'get',
                endpoint:`${api_base_url}/orders/${id}`,
                headers: headers});
            // const truc =  data;
            // console.log("truc")
            // console.log(truc)
            if(data == null) return null;
            return buildOrderFromDTO(data);
            
        } catch (error) {
            console.log("error dans le getobeby")
            console.log(error)
            return null
            
        }
    }
    delete(id: number | String): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    async update(id: number | String, data: any): Promise<Order | null> {
        const headers = getStrapiAuthHeaders();
        const response = await makeRequest({
            method:'put',
            endpoint:`${api_base_url}/orders/${id}`,
            data: {data },
            headers: headers});
        return response.data;
    }
    
}