import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { UserController } from "../../controllers/UserController";
// import { StrapiAuthRepo } from "../../repositories/AuthRepo/StrapiAuthRepo";
import { User } from "../../model/User";
import { StrapiUserRepo } from "../../repositories/UserRepo/StrapiUserRepo";
// import { AuthResponse } from "../../repositories/AuthRepo/IAuthRepo";

export const userController = new UserController(new StrapiUserRepo());

interface UserReducerState {
    users: User[] | null,

}

const initialState: UserReducerState = {
    users: [],
    // jwt: '',
    
}

export const UserSlice = createSlice({
    name: 'User',
    initialState,
    reducers: {  
        setUsers: (state , action: PayloadAction<User[] | null>) => {
            state.users = action.payload;
        },
    },
  })

export const userActions = UserSlice.actions

const selectAllUsers = (state: RootState) => state.userReducer.users;
// const selectJwt = (state: RootState) => state.authReducer.jwt 


export const authSelectors = {
    selectAllUsers,
    // selectJwt
}

export default UserSlice.reducer