import React, { useRef, useState } from 'react'
import {
  IconButton,
} from "@material-tailwind/react"
import {
  PencilIcon,
  LightBulbIcon,
} from "@heroicons/react/24/outline";
import HomePizzaCard from '../components/HomePizzaCard'
import { useAppSelector } from '../logic/redux/reduxHooks';
import { foodSelectors } from '../logic/redux/reducers/FoodReducer';
// import { appSocket } from '../logic/socket';

function HomePage() {

  const filter = [
    "popular",
    "pizza",
    "Top",
    "all menu",
    "Food",
    "extra",
  ]

  const foods = useAppSelector(foodSelectors.selectAllFoods);

  const [filterSelected, setfilterSelected] = useState(0);

  const [scrollX, setScrollX] = useState(0);
  const containerRef = useRef<any>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);

  const handleMouseDown = (e:any) => {
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current!.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e:any) => {
    if (!isDragging) return;
    const newScrollX = e.pageX - containerRef.current!.getBoundingClientRect().left - startX;
    containerRef.current!.scrollLeft = scrollX - newScrollX;
    setScrollX(newScrollX);
  };

  return (
    <div className=''>
      <div className='flex flex-col'>
        {/* Full container */}

        <div className='flex flex-col text-justify  mx-3 p-5'>
          {/* Titles container */}
          <h2 className='font-medium text-lg text-black text-opacity-50'>Food</h2>
          <h2 className='font-bold text-xl'>Special For You</h2>
        </div>
        <div>
          {/* Categories container */}
          <div className=" w-auto flex">
              <ul className='flex flex-row overflow-x-scroll no-scrollbar'>
                {
                  filter.map((filter, index) => (
                    <li style={{transform:filterSelected === index ?'scale(1.1)':''}} className={`mx-7 cursor-pointer ${filterSelected === index ? 'font-bold underline categoryComp decoration-orange-700': ''} capitalize  `} key={index} onClick={() => setfilterSelected(index)}>{filter}</li>
                  ))
                }
              </ul>
          </div>
        </div>

        <div ref={containerRef} className='py-4 flex overflow-x-scroll overflow-y-hidden no-scrollbar space-x-4'
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseUp}
        >
          {/* pizza carousel container */}

          {
            foods.map( (food, index) => (
              <HomePizzaCard pizza={food} key={index} />
            ))
          }
        </div>

        <div className='flex flex-col text-justify mx-3 p-7'>
          {/* infos conainer */}
          <div className='flex justify-end mr-4 my-5 p-5'>
            <IconButton className="rounded-full  bg-white shadow-black">
              <PencilIcon className="h-5 w-5" color='black' />
            </IconButton>
          </div>

        <h2>
          Your informations
        </h2>
        <div className='flex flex-row p-3'>
          <IconButton className="rounded-full  bg-yellow-800">
            <LightBulbIcon className="h-5 w-5" color='black' 
            // onClick={() => {
            //   console.log("clicked")
            //         appSocket.emit("Test", {
            //           firstname: "Jamal"
            //         })
            // }}
            />
          </IconButton>
          <div className='ml-3'>
            <h2 className='font-medium text-base text-opacity-50 text-black'>your delivery address</h2>
            <h2 className='font-bold text-lg'>241 Hillside Road, HASTINGS</h2>
          </div>

        </div>
        <div>

        </div>
        </div>
      </div>           
    </div>
  )
}

export default HomePage
