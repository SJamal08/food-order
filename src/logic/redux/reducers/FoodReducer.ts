import { PayloadAction, createSlice } from "@reduxjs/toolkit";
// import { HomePageController } from "../controllers/HomePageController";
import { RootState } from "../store";
import { Food } from "../../model/Food";
import { Foodcontroller } from "../../controllers/FoodController";
import { InMemoryFoodRepo } from "../../repositories/InMemoryFoodRepository";
import { StrapiFoodRepository } from "../../repositories/strapiFoodRepo/StrapiFoodRepository";
// import { Article } from "../models/Article";
// import { AppUser } from "../models/User";
// import { Society } from "../models/Society";
// import { Product } from "../models/Product";
// import { LikeModel } from "../models/LikeModel";
// import { Category } from "../models/Category";

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


//   const filterSocietiesByCategory = (societies : Society[] , categoryName: String) : Society[] => {
//     // setselectedCategoryName(categoryName)
// if (categoryName === "Tout")   return societies;;
// const newSocietiesFiltered = societies!.filter(society => society!.category === categoryName);
// return newSocietiesFiltered;
// }

export const foodActions = FoodSlice.actions

const selectAllFoods = (state: RootState) => state.foodReducer.foods 
// export const selectFilteredSocieties = (state: RootState) => filterSocietiesByCategory(state.generalReducer.appSocieties ?? [],state.food.categorySelected)
// export const selectCategorySelected = (state: RootState) => state.food.categorySelected;


export const foodSelectors = {
    selectAllFoods,
    // selectFilteredSocieties,
    // selectCategorySelected,
}

export default FoodSlice.reducer