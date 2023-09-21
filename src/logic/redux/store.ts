import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import FoodReducer from './reducers/FoodReducer';

// import userReducer  from 'app/redux/features/userSlice';
// import viewModelsReducer  from 'app/redux/features/vms';
// import controllerReducer  from './controllers';
// import generalReducer  from './general';
// import homePageReducers from './homePageReducers';



export const store = configureStore({
  reducer: {
    // homePage : homePageReducers,
    // controllers : controllerReducer,
    // generalReducer : generalReducer,
    // repositories : repositoriesReducer,
    // user: userReducer,
    // viewModels : viewModelsReducer,
    // homePageReducer : homePageRReducer
    foodReducer: FoodReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;