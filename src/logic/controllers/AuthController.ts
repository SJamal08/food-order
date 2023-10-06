import { AuthResponse, IAuthRepo, LoginPayload, RegisterPayload } from "../repositories/AuthRepo/IAuthRepo";

export class AuthController {
    private authRepository: IAuthRepo;

    constructor(authRepository: IAuthRepo) {
        this.authRepository = authRepository;
    }

    async register(payload: RegisterPayload): Promise<AuthResponse | null> {
        return await this.authRepository.register(payload);
    } 

    async login(payload: LoginPayload): Promise<AuthResponse | null> {
        return await this.authRepository.login(payload);
    } 
}