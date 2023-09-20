import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import { FireIcon,  } from '@heroicons/react/24/solid';
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';

function PizzaDetailPage() {
    const location = useLocation();
    const {pizza} = location.state;

    const [sizeSelected, setsizeSelected] = useState(0);

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

    console.log(pizza)
  return (
    <div className='container'>
      <div className='flex flex-col justify-center'>
        {/* Full container */}

        <div className='flex flex-col text-center mx-3 p-5'>
          {/* Titles container */}
          <h2 className='font-bold text-xl'>{pizza.title}</h2>
          <h2 className='font-medium text-lg my-2'>{pizza.description}</h2>
          <div className='flex justify-center my-4'>
                <FireIcon className='h-5 w-5' color='orange'/>
                <h2 className='mx-3'>{pizza.calories} calories</h2>
            </div>
        </div>

        <div className=''>
            <img className={`border-none rounded-none transform rotate-${rotationAngle} transition-transform duration-300`} src={pizza.img} alt="" />
        </div>

        <div className={`flex justify-between px-24 my-10`}>
            {
                size.map( (s, index) => (
                    <div className='flex items-center justify-center'>
                        <h1 className={`text-opacity-25 flex justify-center items-center w-10 h-10 cursor-pointer ${sizeSelected === index ? 'font-bold bg-yellow-800 rounded-full  ':''}`} onClick={()=> setSize(index)}>{ s.tag}</h1>
                    </div>
                ))
            }
        </div>

        <div className='flex justify-around'>
            <div className='flex flex-col justify-center'>
                <h2 className='font-medium text-base text-opacity-50'>Price</h2>
                <h2 className='font-bold text-lg'>£{size[sizeSelected].price}</h2>
            </div>
            <div className='bg-black rounded-full flex justify-center items-center w-20'>
                <ShoppingBagIcon className='w-10 h-10 bg-yellow-700 rounded-full' color='black'/>
            </div>
        </div>


        </div>
    </div>
  )
}

export default PizzaDetailPage