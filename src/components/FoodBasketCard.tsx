import React from 'react'
import { MinusIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { OrderActions } from '../logic/redux/reducers/OrderReducer';
import { useAppDispatch } from '../logic/redux/reduxHooks';
import { CartItem } from '../logic/model/CartItem';
import { IconButton } from '@material-tailwind/react';

function FoodBasketCard({element}: {element: CartItem}) {

  const dispatch = useAppDispatch();

  const removeFromBasket = () => dispatch(OrderActions.removeFromBasket(element));
  const incrementQuantity = () => dispatch(OrderActions.incrementQuantity(element));
  const decrementQuantity = () => dispatch(OrderActions.decrementQuantity(element));

  const {title, description, price, img, id} = element.food;
  const {quantity, size} = element;
  return (
    <div className='flex w-screen'>
        <div className=''>
          <div className='flex items-center justify-center'>
            <img className={`border-none rounded-none w-40 p-5`} src={img} alt="" />
          </div>
        </div>

        <div className='flex flex-col w-full p-5'>
            <div className='flex justify-between'>
              <p className='font-bold'>{title} - Size: {element.size}</p>
              <XMarkIcon className='h-5 w-5' onClick={removeFromBasket}/>
            </div>
            <div className='flex'>
              <p className='text-transparent text-gray-400'>{description}</p>
            </div>
            <div className='flex justify-between'>
              <p className='font-bold'>€{price} * {quantity} = €{price * quantity}</p>
              <div className='flex items-center mr-10'>
                <IconButton className='w-7 h-7 mr-2' onClick={decrementQuantity}>
                  <MinusIcon  className='h-5 w-5'/>
                </IconButton>
                <p className='font-bold'>{element.quantity}</p>
                <IconButton className='w-7 h-7 ml-2'onClick={incrementQuantity}>
                  <PlusIcon  className='h-5 w-5'/>
                </IconButton>
              </div>
            </div>
        </div>
    </div>
  )
}

export default FoodBasketCard