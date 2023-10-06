import { makeRequest } from "../makeRequest";
import { AuthResponse, IAuthRepo, LoginPayload, RegisterPayload } from "./IAuthRepo";

export class StrapiAuthRepo implements IAuthRepo {
    async register(payload: RegisterPayload): Promise<AuthResponse | null> {
        const response : AuthResponse = await makeRequest('/auth/local/register', payload);
        return response;
    }
    async login(payload: LoginPayload): Promise<AuthResponse | null> {
        const response : AuthResponse = await makeRequest('/auth/local', {identifier: payload.email, password: payload.password});
        return response;
    }
}