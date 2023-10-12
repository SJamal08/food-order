import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import AppRouter from './router';
import { useAppDispatch } from './logic/redux/reduxHooks';
import { foodActions, foodcontroller } from './logic/redux/reducers/FoodReducer';
import { authActions, authController } from './logic/redux/reducers/AuthReducer';

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const getAllFoods = async () => {
      const allFoods = await foodcontroller.getAll();
      if (allFoods)
        {
          dispatch(foodActions.setFoodList(allFoods));
        }
    }
    const getCurrentUser = async () => {
      const user = await authController.me();
      if(user) {
        dispatch(authActions.setCurrentUser(user));
      }
    }
    getAllFoods();
    getCurrentUser();
  }, [dispatch])
  return (
    <div className="">
      <ToastContainer />
      <AppRouter />
    </div>
  );
}

export default App;
