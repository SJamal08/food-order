import React from 'react'
import FoodBasketCard from '../components/FoodBasketCard';
import { Button } from '@material-tailwind/react';
import {  OrderSelectors } from '../logic/redux/reducers/OrderReducer';
import { useAppSelector } from '../logic/redux/reduxHooks';
import { authSelectors } from '../logic/redux/reducers/AuthReducer';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../utils/constants';
import * as basketHelper from '../utils/basketLogic';

function BasketViewPage() {

  const user = useAppSelector(authSelectors.selectUser);
  const basket = useAppSelector(OrderSelectors.selectBasket);
  const navigate = useNavigate();

  const discount = 10;
  const totalPrice = basketHelper.getTotalPrice(basket, discount, 5);
  const basketPrice = basketHelper.getBasketPrice(basket);

  const createPayment = async () => {
    if(!user) {
      navigate(ROUTES.loginPage)
      return;
    }
    navigate(ROUTES.paymentStripePage, {state: {
      amount: parseFloat(totalPrice),
    } 
    })
  }


  return (
    <div className='flex flex-col max-w-screen-lg h-screen'>
          {
            basket.length === 0 ? 
            <div className='flex items-center justify-center'>
              panier vide
            </div> :
            <div className='flex flex-col w-full'>
              {
                basket.map((element,index) => (
                <FoodBasketCard element={element} key={index}/>
           ))}
           <div className='px-5'>
              <div className='flex justify-around px-5'>
                {/* <Input label='' crossOrigin={undefined} className='w-40'/> */}
                <p className=''>ADJ3AK</p>
                <p className='font-bold text-green-400'>Promocode </p>
              </div>
              <div className=''>
                <div className='flex justify-between'>
                  <p className=''>SubTotal: </p>
                  <p className='font-bold'>€ {basketPrice}</p>
                </div>
                <div className='flex justify-between'>
                  <p className=''>Delivery fees:</p>
                  <p className='font-bold'>€ 5</p>
                </div>
                <div className='flex justify-between'>
                  <p className=''>Discount:</p>
                  <p className='font-bold'>{discount}%</p>
                </div>
              </div>
              <div className='w-md flex justify-center'>
                <Button className='w-44' onClick={() => createPayment()}>
                  Order For €{totalPrice}
                </Button>
              </div>
           </div>
            </div>
        }
    </div>
  )
}

export default BasketViewPage