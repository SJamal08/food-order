import { User } from "../model/User";
import { AuthResponse, IAuthRepo, LoginPayload, RegisterPayload, forgotPasswordPayload } from "../repositories/AuthRepo/IAuthRepo";
import * as Yup from 'yup';

export class AuthController {
    private authRepository: IAuthRepo;

    constructor(authRepository: IAuthRepo) {
        this.authRepository = authRepository;
    }

     loginUserSchema = Yup.object({
        email:  Yup.string().email("Le mail est invalide ").required("le mail est requis"),
        password:  Yup.string().min(4 ,  "Minimun 4 lettres please ").required("le mot de passe est requis"),
      });
      loginInitialValues = {email : "user@gmail.com"  , password : "strapiPassword" };

      forgotUserSchema = Yup.object({
        email:  Yup.string().email("Le mail est invalide ").required("le mail est requis"),
      });
      forgotInitialValues = {email : "user@gmail.com"  }


      registerUserSchema = Yup.object({
        username: Yup.string(),
        email:  Yup.string().email("Le mail est invalide ").required("le mail est requis"),
        password:  Yup.string().min(4 ,  "Minimun 4 lettres please ").required("le mot de passe est requis"),
      });
      registerInitialValues = {username:"SJamal08", email : "user@gmail.com"  , password : "strapiPassword" };


    async register(payload: RegisterPayload): Promise<AuthResponse | null> {
        return await this.authRepository.register(payload);
    } 

    async login(payload: LoginPayload): Promise<AuthResponse | null> {
        return await this.authRepository.login(payload);
    } 

    async me(): Promise<User | null> {
        return await this.authRepository.me();
    }

    async logout(): Promise<Boolean> {
        return await this.authRepository.logout();
    }

    async forgotPassword(payload: forgotPasswordPayload): Promise<any> {
        return await this.authRepository.forgotPassword(payload);
    }

    async isAuthorized(idUser: string | number): Promise<Boolean> {
        return await this.authRepository.isAuthorized(idUser);
    }
}