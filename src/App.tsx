import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import AppRouter from './router';
import { useAppDispatch } from './logic/redux/reduxHooks';
import { foodActions, foodcontroller } from './logic/redux/reducers/FoodReducer';
import { authActions, authController } from './logic/redux/reducers/AuthReducer';
import { OrderActions, ordercontroller } from './logic/redux/reducers/OrderReducer';
import { appSocket } from './logic/socket';

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    // appSocket.on("connect", () => {
    //   console.log("mon socket ici")
    //   console.log(appSocket.id);
    // });
    // appSocket.on("notification", (params) => {
    //   console.log("params")
    //   console.log(params);
    //   toast("nouvelle notif")
    // });
    const getAllFoods = async () => {
      const allFoods = await foodcontroller.getAll();
      if (allFoods)
        {
          dispatch(foodActions.setFoodList(allFoods));
        }
    }
    const getCurrentUser = async () => {
      const user = await authController.me();
      dispatch(authActions.setCurrentUser(user));
      if(user) {
        getMyOrders(user.id);
      }
    }

    const getMyOrders = async (id: number | string) => {
      const allOrders = await ordercontroller.getAllForOneUser(id);

      if (!allOrders) return;
      dispatch(OrderActions.setOrders(allOrders));
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
