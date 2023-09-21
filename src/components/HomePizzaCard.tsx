import { Typography } from '@material-tailwind/react'
import {
    FireIcon,
    HeartIcon,
  } from "@heroicons/react/24/solid";
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Food } from '../logic/model/Food';

function HomePizzaCard({pizza}: {pizza: Food}) {

  const navigate = useNavigate();

    const [isLiked, setIsLiked] = useState(false);
    const [isRotating, setisRotating] = useState(false);
    // const [rotationAngle, setrotationAngle] = useState(0)

    // const rotation = () => {
    //     setrotationAngle(rotationAngle+180);
    //     if (rotationAngle === 360) {
    //         setrotationAngle(0);
    //     }
    // }
  return (
    <div>
        <div className="w-80 shadow-lg pb-2">
            <div className="">
                <div className='flex justify-between px-5 items-center mt-10'>
                    <div className='flex'>
                        <FireIcon className='h-5 w-5' color='orange'/>
                        <h2 className='mx-3'>{pizza.calories} calories</h2>
                    </div>
                    <div className='flex justify-end' onClick={() => setIsLiked(!isLiked)}>
                        <HeartIcon className='h-5 w-5' color={isLiked ? 'orange' : 'gray'} />
                    </div>
                </div>
                <div className=''>
                    <img onAnimationStart={()=> console.log("une animation a commencé")} onAnimationEnd={()=> console.log("une animation a pris fin")} 
                    className={`border-none rounded-none h-44 mx-auto ${isRotating ? 'pizza-rotation': ''}`} onClick={()=> setisRotating(!isRotating)} src={pizza.img} alt="" />
                </div>
            </div>
            <div className="text-justify px-5 ">
                <Typography variant="h4" color="blue-gray" className="mb-2 cursor-pointer hover:underline" onClick={() => navigate('/details', {state: {pizza}})}>
                    {pizza.title}
                </Typography>
                <Typography color="blue-gray" className="font-medium" textGradient>
                    {pizza.description}
                </Typography>
                <Typography variant="h4" color="blue-gray" className="mb-2">
                    ${pizza.price}
                </Typography>
            </div>
        </div>
    </div>
  )
}

export default HomePizzaCard