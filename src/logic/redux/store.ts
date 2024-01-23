import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import FoodReducer from './reducers/FoodReducer';
import OrderReducer from './reducers/OrderReducer';
import AuthReducer from './reducers/AuthReducer';
import UserReducer from './reducers/UserReducer';

export const store = configureStore({
  reducer: {
    foodReducer: FoodReducer,
    orderReducer: OrderReducer,
    authReducer: AuthReducer,
    userReducer: UserReducer,
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