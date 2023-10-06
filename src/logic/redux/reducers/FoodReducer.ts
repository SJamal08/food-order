import { PayloadAction, createSlice } from "@reduxjs/toolkit";
// import { HomePageController } from "../controllers/HomePageController";
import { RootState } from "../store";
import { Food } from "../../model/Food";
import { Foodcontroller } from "../../controllers/FoodController";
import { InMemoryFoodRepo } from "../../repositories/FoodRepo/InMemoryFoodRepository";
import { StrapiFoodRepository } from "../../repositories/FoodRepo/strapiFoodRepo/StrapiFoodRepository";

// export const foodcontroller = new Foodcontroller(new InMemoryFoodRepo());
export const foodcontroller = new Foodcontroller(new StrapiFoodRepository());

interface FoodReducerState {
    foods: Food [],

}

const initialState: FoodReducerState = {
    foods: [],
    
}

export const FoodSlice = createSlice({
    name: 'Food',
    initialState,
    reducers: {  
        setFoodList: (state , action: PayloadAction<Food[]>) => {
            state.foods = action.payload;
        },
        
   
    },
  })

export const foodActions = FoodSlice.actions

const selectAllFoods = (state: RootState) => state.foodReducer.foods 


export const foodSelectors = {
    selectAllFoods,
}

export default FoodSlice.reducer