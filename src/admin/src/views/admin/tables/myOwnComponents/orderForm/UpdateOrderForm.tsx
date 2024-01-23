import React, { useState } from 'react'
import FoodBasketCard from '../../../../../../../components/FoodBasketCard';
import { CartItem } from '../../../../../../../logic/model/CartItem';
import { MinusIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { Button, IconButton } from '@material-tailwind/react';
import { getBasketPrice, getTotalPrice } from '../../../../../../../utils/basketLogic';
import { ordercontroller } from '../../../../../../../logic/redux/reducers/OrderReducer';
import { toast } from 'react-toastify';



 function BasketItemCard({item, index, addQuantity, reduceQuantity, removeFromBasket} : {item: CartItem,index: number, addQuantity: any, reduceQuantity: any, removeFromBasket: any}) {


    const {title, description, price, img, id} = item.food;
    var {quantity, size} = item;

  return (
    <div className='flex w-full'>
    <div className=''>
      <div className='flex items-center justify-center'>
        <img className={`border-none rounded-none w-40 p-5`} src={img} alt="" />
      </div>
    </div>

    <div className='flex flex-col w-full p-5'>
        <div className='flex justify-between'>
          <p className='font-bold'>{title} - Size: {size}</p>
          <XMarkIcon className='h-5 w-5' onClick={() => removeFromBasket(index)}/>
        </div>
        <div className='flex'>
          <p className='text-transparent text-gray-400'>{description}</p>
        </div>
        <div className='flex justify-between'>
          <p className='font-bold'>€{price} * {quantity} = €{price * quantity}</p>
          <div className='flex items-center mr-10'>
            <IconButton className='w-7 h-7 mr-2' onClick={() => reduceQuantity(index)}>
            {/* <IconButton className='w-7 h-7 mr-2' onClick={() => setquantity(quantity-1)}> */}
              <MinusIcon  className='h-5 w-5'/>
            </IconButton>
            <p className='font-bold'>{quantity}</p>
            <IconButton className='w-7 h-7 ml-2'onClick={() => addQuantity(index)}>
              <PlusIcon  className='h-5 w-5'/>
            </IconButton>
          </div>
        </div>
    </div>
</div>
  )
}

function UpdateOrderForm(props: {obj: any, action: any}) {

    const [basket, setBasket] = useState([...props.obj!.basket]);

    const addQuantity = (index: number) => {
        const tmpbasket = [...basket];
        let tmpItem = {...basket[index]};
        tmpItem.quantity+=1;
        tmpbasket[index] = tmpItem;
        setBasket(tmpbasket);
    }

    const reduceQuantity = (index: number) => {
        const tmpbasket = [...basket];
        let tmpItem = {...basket[index]};
        tmpItem.quantity-=1;
        tmpbasket[index] = tmpItem;
        setBasket(tmpbasket);
        if (tmpbasket[index].quantity === 0) removeFromBasket(index)
    }

    const removeFromBasket = (index: number) => {
        let tmpbasket = [...basket];
        tmpbasket = tmpbasket.filter(el => el.food.id !== tmpbasket[index].food.id)
        setBasket(tmpbasket);
    }

    const updateOrder = async () => {
        try {
            const tmpOrder = {...props.obj};
            tmpOrder.basket = [...basket];
            if (basket.length === 0) {
            const deleteOrder = await ordercontroller.delete(tmpOrder.id);
            if (deleteOrder) {
                toast.success("deleted Successfully");  
            }
            }
            tmpOrder.amount = parseFloat(getTotalPrice(basket, 0, 5));
            const updatedOrder = await ordercontroller.update(tmpOrder.id, tmpOrder);
            if (updatedOrder) {
                toast.success("updated Successfully");  
            }
        } catch (error) {
            console.log("error")
            console.log(error)
            toast.success("Sorry ! an error happened, try later");  

        }
    }

  return (
        <div className='flex flex-col w-full'>
            Update Order
            {
                basket.map((element: any,index: number) => (
                    <BasketItemCard item={element} index={index} addQuantity={addQuantity} reduceQuantity={reduceQuantity} removeFromBasket={removeFromBasket}/>
           ))}

            <Button onClick={updateOrder}>
                update
            </Button>

        </div>
  )
}

export default UpdateOrderForm