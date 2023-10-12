import { API_BASE_URL } from "../../utils/constants";
import { makeRequest } from "../repositories/makeRequest";

export interface StripeCustomerPayload {
    email: string,
    name: string
}

export interface StripePaymentIntentPayload {
    amount: number,
    customer: string,
    currency: 'eur',
    payment_method_types: ['card'],
    description: string
}

const api_base_url = API_BASE_URL.nodeUrl;
export class StripeRepository {

    async createCustomer(payload: StripeCustomerPayload): Promise<string> {
        const data: string = await makeRequest({
            method: "post",
            endpoint:`${api_base_url}/createCustomer`,
            data: payload 
        });
          return data;
    }

    async createPaymentIntent(payload: StripePaymentIntentPayload): Promise<any> {
        const data = await makeRequest({
            method: "post",
            endpoint:`${api_base_url}/createPaymentIntent`,
            data: payload 
        })
        return data;
    }
}