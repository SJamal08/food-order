import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { AuthController } from "../../controllers/AuthController";
import { StrapiAuthRepo } from "../../repositories/AuthRepo/StrapiAuthRepo";
import { User } from "../../model/User";
import { AuthResponse } from "../../repositories/AuthRepo/IAuthRepo";

export const authController = new AuthController(new StrapiAuthRepo());

interface AuthReducerState {
    user: User | null,
    // jwt?: string

}

const initialState: AuthReducerState = {
    user: null,
    // jwt: '',
    
}

export const AuthSlice = createSlice({
    name: 'Auth',
    initialState,
    reducers: {  
        setAuth: (state , action: PayloadAction<AuthResponse>) => {
            state.user = action.payload.user;
            // state.jwt = action.payload.jwt;
        },
        setCurrentUser: (state , action: PayloadAction<User>) => {
            state.user = action.payload;
        },
    },
  })

export const authActions = AuthSlice.actions

const selectUser = (state: RootState) => state.authReducer.user 
// const selectJwt = (state: RootState) => state.authReducer.jwt 


export const authSelectors = {
    selectUser,
    // selectJwt
}

export default AuthSlice.reducer