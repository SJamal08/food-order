import React from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Badge,
  Drawer,
} from "@material-tailwind/react";
import { Bars3Icon, MagnifyingGlassIcon, ShoppingCartIcon } from "@heroicons/react/24/solid";
import { useAppSelector } from "../logic/redux/reduxHooks";
import { OrderSelectors } from "../logic/redux/reducers/OrderReducer";
import { foodSelectors } from "../logic/redux/reducers/FoodReducer";
import { useNavigate } from "react-router-dom";
import { authSelectors } from "../logic/redux/reducers/AuthReducer";
import { ROUTES } from "../utils/constants";
 
export function NavbarDefault() {


  const [openNav, setOpenNav] = React.useState(false);

  const basket = useAppSelector(OrderSelectors.selectBasket);
  const foods = useAppSelector(foodSelectors.selectAllFoods);
  const user = useAppSelector(authSelectors.selectUser);

  const navigate = useNavigate();
 
  return (
    <Navbar blurred={false} className='max-w-full flex justify-between letruc '>
      <div>
        <IconButton
        variant="text"
        className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent"
        ripple={false}
        onClick={() => setOpenNav(!openNav)}
        >
          <Bars3Icon className='w-5 h-5' color='black'/>
        </IconButton>
      </div>

  <Drawer open={openNav} className="bg-gray-300 text-[#000000]" overlay>
    <div className="mb-2 flex items-center justify-between px-4">
      <Typography className="cursor-pointer" variant="h5" color="blue-gray" onClick={() => navigate(ROUTES.homePage)}>
        Pizza Order
      </Typography>
      <IconButton variant="text" color="blue-gray" onClick={() => setOpenNav(false)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="h-5 w-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </IconButton>
    </div>
      <ul className="mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:items-center lg:gap-6">
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-normal"
        >
          <a href="#" className="flex items-center font-bold text-[#000000]">
            Pages
          </a>
        </Typography>
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-normal"
        >
          <a href="#" className="flex items-center font-bold text-[#000000]">
            Account: {user?.email || ""}
          </a>
        </Typography>
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-normal"
        >
          <a href={ROUTES.myOrderPage} className="flex items-center font-bold text-[#000000]">
            My orders
          </a>
        </Typography>
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-normal"
        >
          <a href="#" className="flex items-center font-bold text-[#000000]">
            Docs
          </a>
        </Typography>
      </ul>
  </Drawer>
  <div className='flex pl-2 pr-2'>
    <Badge content={basket.reduce((previous, current) => previous + current.quantity, 0)}  className={`${foods.length === 0 ? "hidden": ""}`} >
      <IconButton
        variant="text"
        className="h-6 w-6 text-inherit mr-2"
        onClick={() => navigate(ROUTES.basketViewPage)}
      >
        <ShoppingCartIcon className='w-5 h-5' color='black' />
      </IconButton>
    </Badge>
    <IconButton
      variant="text"
      className="h-6 w-6 text-inherit space-x-2"
    >
      <MagnifyingGlassIcon className='w-5 h-5' color='black'/>
    </IconButton>
  </div>
</Navbar>
  );
}