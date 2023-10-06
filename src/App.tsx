import React, { useEffect } from 'react';
import './App.css';
import AppRouter from './router';
import { useAppDispatch } from './logic/redux/reduxHooks';
import { foodActions, foodcontroller } from './logic/redux/reducers/FoodReducer';

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const getAllFoods = async () => {
      const allFoods = await foodcontroller.getAll();
      console.log("allFoods")
      console.log(allFoods)
      if (allFoods)
        {
          dispatch(foodActions.setFoodList(allFoods));
        }
    }
    getAllFoods();
    // alert("any message")
  }, [dispatch])
  
  return (
    <div className="App">
      <AppRouter />
    </div>
  );
}

export default App;
