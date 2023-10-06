import { User } from "../../model/User";

export interface RegisterPayload {
    username: string,
    email: string,
    password: string,
}

export interface LoginPayload {
    email: string,
    password: string,
}

export interface AuthResponse {
    user: User,
    jwt?: string
}

export interface IAuthRepo {
    register(payload: RegisterPayload) : Promise<AuthResponse | null>,
    login(payload: LoginPayload) : Promise<AuthResponse | null>,
}