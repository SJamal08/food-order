import { User } from "../model/User";
import { IUserRepo } from "../repositories/UserRepo/IUserRepo";


export class UserController {

    private userRepository: IUserRepo;
    
    constructor(userRepo: IUserRepo) {
        this.userRepository = userRepo;
    }

    async getAll(): Promise<User[]> {
        return await this.userRepository.getAll();
    }

    async delete(idUser: string | number): Promise<Boolean> {
        return await this.userRepository.deleteOne(idUser);
    }
}