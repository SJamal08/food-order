import { User } from "../../model/User";

// export interface RegisterPayload {
//     username: string,
//     email: string,
//     password: string,
//     customerId: string,
// }

// export interface LoginPayload {
//     email: string,
//     password: string,
// }

// export interface forgotPasswordPayload {
//     email: string,
// }

// export interface AuthResponse {
//     user: User,
//     jwt?: string
// }

export interface IUserRepo {
    getAll(): Promise< User []>,
    deleteOne(idUser: number | string): Promise<Boolean>,
}