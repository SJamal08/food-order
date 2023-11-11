import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import { FireIcon } from '@heroicons/react/24/solid';
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import  { OrderActions } from "../logic/redux/reducers/OrderReducer";
import { useAppDispatch } from '../logic/redux/reduxHooks';
import { ROUTES } from '../utils/constants';

function PizzaDetailPage() {
    const location = useLocation();
    const {pizza} = location.state;
    const navigate = useNavigate();
    const dispatch = useAppDispatch();


    const [sizeSelected, setsizeSelected] = useState(0);

    const renderSTyleSizingForImage = () => {
        switch (sizeSelected) {
            case 0:
                return 200;
            case 1:
                return 300;
            case 2:
                return 350;    
            default:
                return 200;
        }
    }

    const setSize = (index: number) => {
        rotation();
        setsizeSelected(index);
    }

    const size = [
        {
            name: "small",
            tag: "S",
            price: pizza.price,
        },
        {
            name: "medium",
            tag: "M",
            price: pizza.price +2,
        },      {
            name: "large",
            tag: "L",
            price: pizza.price + 5,
        },
    ]

    const [rotationAngle, setrotationAngle] = useState(0)

    const rotation = () => {
        setrotationAngle(rotationAngle+45);
        if (rotationAngle === 360) {
            setrotationAngle(0);
        }
    }

    const addToBasket = () => {
        dispatch(OrderActions.addInBasket({ food: {...pizza, price: size[sizeSelected].price}, size: size[sizeSelected].tag}));
        navigate(ROUTES.basketViewPage);
    }

  return (
        <div className='flex flex-1 flex-col justify-center h-screen w-full'>
            <div className='flex flex-col text-center mt-5'>
          {/* Titles container */}
          <h2 className='font-bold text-xl'>{pizza.title}</h2>
          <h2 className='font-medium text-lg'>{pizza.description}</h2>
          <div className='flex justify-center'>
                <FireIcon className='h-5 w-5' color='orange'/>
                <h2 className='mx-3 text-black text-opacity-50'>{pizza.calories} calories</h2>
            </div>
            </div>

            <div className='flex-1 flex flex-col justify-between'>
                <div className='flex-1 flex flex-col justify-center'>
                    <img className={` mx-auto border-none rounded-none transform rotate-${rotationAngle} transition-transform duration-300`} style={{
                        height: renderSTyleSizingForImage()
                    }} src={pizza.img} alt="" />                 
                </div>
                <div className=''>
                    <div className={`flex justify-between px-40  items-center w-full `}>
                        {
                            size.map( (s, index) => (
                                <div className='flex items-center justify-center'>
                                    <p className={`text-opacity-50 flex justify-center items-center w-10 h-10 cursor-pointer text-black ${sizeSelected === index ? ' text-opacity-100 font-bold bg-yellow-800 rounded-full  ':''}`} onClick={()=> setSize(index)}>{ s.tag}</p>
                                </div>
                            ))
                        }
                    </div>

                    <div className='flex justify-around'>
                        <div className='flex flex-col justify-center'>
                            <h2 className='font-medium text-base text-opacity-50 text-black'>Price</h2>
                            <h2 className='font-bold text-lg'>£{size[sizeSelected].price}</h2>
                        </div>
                        <div onClick={addToBasket} className='bg-black rounded-full flex justify-center items-center w-20'>
                            <ShoppingBagIcon className='w-10 h-10 bg-yellow-700 rounded-full' color='black'/>
                        </div>
                    </div>
                </div>

            </div>

        </div>
  )
}

export default PizzaDetailPage