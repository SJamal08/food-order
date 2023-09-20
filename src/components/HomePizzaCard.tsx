import { Card, CardBody, CardHeader, Typography } from '@material-tailwind/react'
import {
    PencilIcon,
    LightBulbIcon,
    FireIcon,
    HeartIcon,
  } from "@heroicons/react/24/solid";
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function HomePizzaCard({pizza}: {pizza: any}) {

  const navigate = useNavigate();

    const [isLiked, setIsLiked] = useState(false);
    const [rotationAngle, setrotationAngle] = useState(0)

    const rotation = () => {
        setrotationAngle(rotationAngle+180);
        if (rotationAngle === 360) {
            setrotationAngle(0);
        }
    }
  return (
    <div>
        <Card className="w-96">
            <CardHeader floated={true} className="h-80">
                <div className='flex justify-around mt-10'>
                    <div className='flex'>
                        <FireIcon className='h-5 w-5' color='orange'/>
                        <h2 className='mx-3'>{pizza.calories} calories</h2>
                    </div>
                    <div className='flex justify-end' onClick={() => setIsLiked(!isLiked)}>
                        <HeartIcon className='h-5 w-5' color={isLiked ? 'orange' : 'gray'} />
                    </div>
                </div>
                <img className={`border-none rounded-none transform rotate-${rotationAngle} transition-transform duration-500`} onClick={rotation} src={pizza.img} alt="" />
            </CardHeader>
            <CardBody className="text-justify">
                <Typography variant="h4" color="blue-gray" className="mb-2 cursor-pointer hover:underline" onClick={() => navigate('/details', {state: {pizza}})}>
                    {pizza.title}
                </Typography>
                <Typography color="blue-gray" className="font-medium" textGradient>
                    {pizza.description}
                </Typography>
                <Typography variant="h4" color="blue-gray" className="mb-2">
                    ${pizza.price}
                </Typography>
            </CardBody>
        </Card>
    </div>
  )
}

export default HomePizzaCard