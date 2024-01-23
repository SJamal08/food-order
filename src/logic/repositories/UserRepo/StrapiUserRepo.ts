import { API_BASE_URL } from "../../../utils/constants";
import { User } from "../../model/User";
import { getStrapiAuthHeaders } from "../AuthRepo/StrapiAuthRepo";
import { makeRequest } from "../makeRequest";
import { IUserRepo } from "./IUserRepo";

const api_base_url = API_BASE_URL.strapiUrl;
export class StrapiUserRepo implements IUserRepo {
    async getAll(): Promise<User[]> {
        const headers = getStrapiAuthHeaders();
        const all: strapiDTOUser[] = await makeRequest({
            method: 'get',
            endpoint:`${api_base_url}/users`,
            headers: headers
          });
          return convertDTOUserTable(all);
    }
    deleteOne(idUser: string | number): Promise<Boolean> {
        console.log("delete one: please implement me")
        throw new Error("Method not implemented.");
    }

}

function convertDTOUserToUser(user: strapiDTOUser): User {
    const {id, username, email, customerId} = user;
    return {
        id,
        username,
        email,
        customerId,
    }
}

function convertDTOUserTable(table: strapiDTOUser[]): User[] {
    return table.map( user => convertDTOUserToUser(user));
}

interface strapiDTOUser {
    id: number
  username: string
  email: string
  provider: string
  confirmed: boolean
  blocked: boolean
  createdAt: string
  updatedAt: string
  customerId: string
}