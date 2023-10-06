import React from 'react'
import FoodBasketCard from '../components/FoodBasketCard';
import { Button } from '@material-tailwind/react';
import {  OrderSelectors, ordercontroller } from '../logic/redux/reducers/OrderReducer';
import { useAppDispatch, useAppSelector } from '../logic/redux/reduxHooks';
import { Order } from '../logic/model/Order';
import { OrderPayload } from '../logic/repositories/OrderRepo/IOrderRepo';
function BasketViewPage() {

  const basket = useAppSelector(OrderSelectors.selectBasket);
  const discount = 10;
  const createPayment = async () => {
    const order: OrderPayload = {
      basket: basket,
      idUser: 0
    }
    const success = await ordercontroller.create(order);
    console.log(success)
  }

  const getBasketPrice = () => {
    return basket.reduce((previous, current) => previous + (current.food.price * current.quantity) , 0 );
  }

  const getTotalPrice = () => {
    const basketPrice = getBasketPrice();
    let total = basketPrice;
    total = (total - (total / 10)) + 5;
    return total.toFixed(2);
  }


  return (
    <div className='flex flex-col max-w-screen-lg'>
        foodsViewPage
          {
            basket.length === 0 ? 
            <div>
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
                  <p className='font-bold'>€ {getBasketPrice()}</p>
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
              <div className='w-md'>
                <Button className='w-44' onClick={() => createPayment()}>
                  Order For €{getTotalPrice()}
                </Button>
              </div>

           </div>
            </div>
        }
    </div>
  )
}

export default BasketViewPage