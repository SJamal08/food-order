import React, { useRef, useState } from 'react'
import {
  IconButton, MobileNav, Navbar,
} from "@material-tailwind/react"
import {
  PencilIcon,
  LightBulbIcon,
} from "@heroicons/react/24/outline";
import HomePizzaCard from '../components/HomePizzaCard'
import { NavbarDefault } from '../components/Navbar';
import { Bars3Icon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';

function HomePage() {

  const filter = [
    "popular",
    "pizza",
    "Top",
    "all menu",
    "Food",
    "extra",
  ]

  const pizzaList = [
    {
      title: "Clasico",
      description: "Mixed pizza with chesse",
      price: 7.99,
      calories: 238,
      img: "https://media.istockphoto.com/id/1042948900/photo/pizza-pepperoni-isolated-on-white-background.webp?b=1&s=170667a&w=0&k=20&c=5TZsBkiQFd8FCz1HU1jdSfc-eZbCpkV6vyuxtvsBjWc="
    },
    {
      title: "Clasico",
      description: "Mixed pizza with chesse",
      price: 7.99,
      calories: 238,
      img: "https://media.istockphoto.com/id/1042948900/photo/pizza-pepperoni-isolated-on-white-background.webp?b=1&s=170667a&w=0&k=20&c=5TZsBkiQFd8FCz1HU1jdSfc-eZbCpkV6vyuxtvsBjWc="
    },
    {
      title: "Clasico",
      description: "Mixed pizza with chesse",
      price: 7.99,
      calories: 238,
      img: "https://media.istockphoto.com/id/1042948900/photo/pizza-pepperoni-isolated-on-white-background.webp?b=1&s=170667a&w=0&k=20&c=5TZsBkiQFd8FCz1HU1jdSfc-eZbCpkV6vyuxtvsBjWc="
    },
  ];

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
    <div className='container'>
      <Navbar className='max-w-screen flex justify-between'>
      <IconButton
          variant="text"
          className="h-6 w-6 text-inherit"
        >
          <Bars3Icon className='w-5 h-5' color='black'/>
        </IconButton>
        <IconButton
          variant="text"
          className="h-6 w-6 text-inherit"
        >
          <MagnifyingGlassIcon className='w-5 h-5' color='black'/>
        </IconButton>
      </Navbar>
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
                    <li className={`mx-7 cursor-pointer ${filterSelected === index ? 'font-bold underline decoration-orange-700': ''}  `} key={index} onClick={() => setfilterSelected(index)}>{filter}</li>
                  ))
                }
              </ul>
          </div>
        </div>

        <div ref={containerRef} className='flex overflow-x-scroll overflow-y-hidden no-scrollbar '
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseUp}
        >
          {/* pizza carousel container */}

          {
            pizzaList.map( pizza => (
              <HomePizzaCard pizza={pizza} />
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
            <LightBulbIcon className="h-5 w-5" color='black'/>
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
