import { API_BASE_URL } from "../../../utils/constants";
import { User } from "../../model/User";
import { makeRequest } from "../makeRequest";
import { AuthResponse, IAuthRepo, LoginPayload, RegisterPayload, forgotPasswordPayload } from "./IAuthRepo";

const api_base_url = API_BASE_URL.strapiUrl;
export class StrapiAuthRepo implements IAuthRepo {
    async forgotPassword(payload: forgotPasswordPayload): Promise<any> {
        const url = 'http:/localhost:1337/admin/plugins/users-permissions/auth/reset-password';
        const test = {
            email: payload.email,
        }
        const response = await makeRequest({
            method: "post",
            endpoint: api_base_url+'/auth/forgot-password',
            headers: getStrapiAuthHeaders(),
            data: test
        });
        return response;
    }
    async isAuthorized(idUser: string | number): Promise<Boolean> {
        const current = await this.me();
        if (!current || current.id !== idUser) return Promise.resolve(false);
        return Promise.resolve(true);
    }
    async me(): Promise<User | null> {
        if (!localStorage.getItem('jwt')) {
            return null;
        }
        const response = await makeRequest({
            method: "get",
            endpoint: api_base_url+'/users/me',
            headers: getStrapiAuthHeaders()
        });
        if (!response) return null;
        const user: User = {
            id: response.id,
            email: response.email,
            username: response.username,
            customerId: response.customerId
        }
        if(!user) {
            localStorage.removeItem('jwt');
            return null;
        }
        return user;
    }
    logout(): Promise<boolean> {
        try {
            localStorage.removeItem('jwt');
            return Promise.resolve(true);
        } catch (error) {
            return Promise.resolve(false);
        }
    }
    async register(payload: RegisterPayload): Promise<AuthResponse | null> {
        const response : AuthResponse = await makeRequest({
            method: "post",
            endpoint: api_base_url+'/auth/local/register',
            data: payload
        });
        return response;
    }
    async login(payload: LoginPayload): Promise<AuthResponse | null> {
        const response : AuthResponse = await makeRequest({
            method: "post",
            endpoint: api_base_url+'/auth/local',
            data: {identifier: payload.email, password: payload.password}
        });
        if( response.jwt)
            localStorage.setItem("jwt", response.jwt);
        return response;
    }
}

export const getStrapiAuthHeaders = () => {

    return {
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    } 
  }