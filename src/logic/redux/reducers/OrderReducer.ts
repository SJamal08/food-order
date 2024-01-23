import { PayloadAction, createSlice } from "@reduxjs/toolkit";
// import { HomePageController } from "../controllers/HomePageController";
import { RootState } from "../store";
import { Order } from "../../model/Order";
import { CartItem } from "../../model/CartItem";
import { StrapiOrderRepository } from "../../repositories/OrderRepo/StrapiOrderRepository";
import { Ordercontroller } from "../../controllers/OrderController";
import { Food } from "../../model/Food";

export const ordercontroller = new Ordercontroller(new StrapiOrderRepository());
interface OrderReducerState {
    basket: CartItem[],
    myOrders: Order[],
    allOrders: Order[],

}

const initialState: OrderReducerState = {
    basket: [
        // {
        //     "food": {
        //         "id": 1,
        //         "title": "pepperoni",
        //         "description": "lorem ipsum",
        //         "price": 9.99,
        //         "calories": 495,
        //         "img": "https://clipart-library.com/images_k/transparent-pizza/transparent-pizza-21.png"
        //     },
        //     "quantity": 1,
        //     "size": "M"
        // }
    ],
    myOrders: [],
    allOrders: []
    
}

export const OrderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {  
        //       ------ BASKET ACTIONS ------
        setBasket: (state , action: PayloadAction<CartItem[]>) => {
            state.basket = action.payload;
        },

        incrementQuantity: (state , action: PayloadAction<CartItem>) => {
            state.basket = updateQuantity2(state.basket, action.payload, + 1);
            // state.basket = updateQuantity(basket, element, 'add');
        },

        decrementQuantity: (state , action: PayloadAction<CartItem>) => {
            state.basket = updateQuantity2(state.basket, action.payload, - 1);
            // state.basket = updateQuantity(basket, element, 'remove');
        },
        
        addInBasket: (state, action: PayloadAction<{food: Food, size: string}>) => {
            const {basket} = state;
            const {food, size} = action.payload;
            if(basket.find(el => el.food.id === food.id && el.size === size))
                {
                    const index = basket.findIndex(el => el.food.id === food.id);
                    const lastelement = basket[index];
                    basket[index] = {...lastelement, quantity:lastelement.quantity+1};
                }
            else {
                basket.push({food: food,quantity: 1, size: size });
            }
        },    
        removeFromBasket: (state , action: PayloadAction<CartItem>) => {
            let {basket} = state;
            const element = action.payload;
            state.basket = basket.filter(el => el.food.id !== element.food.id);
        },

        //  ------ ORDERS ACTIONS -------
        setOrders: (state , action: PayloadAction<Order[]>) => {
            state.myOrders = action.payload;
        },
        setAllOrders: (state , action: PayloadAction<Order[]>) => {
            state.allOrders = action.payload;
        },
    },
  })

//   const updateQuantity = (basket: CartItem[], cartItem: CartItem, action: string) => {
//     const index = basket.findIndex(el => el.food.id === cartItem.food.id);
//     switch (action) {
//         case "add":
//             basket[index] = {...cartItem, quantity: cartItem.quantity + 1};
//             return basket;
//         case "remove":
//             basket[index] = {...cartItem, quantity: cartItem.quantity - 1};
//             return basket;
    
//         default:
//             return basket;
//     }
//   }

  const updateQuantity2 = (basket: CartItem[], cartItem: CartItem, add: number) => {
    // const index = basket.findIndex(el => el.food.id === cartItem.food.id);
    if(!(basket[index(basket, cartItem)].quantity === 0 && add === -1))
        basket[index(basket, cartItem)] = {...cartItem, quantity: cartItem.quantity + add};
    return basket;
  }
  const index = (basket: CartItem[], cartItem: CartItem) =>  basket.findIndex(el => el.food.id === cartItem.food.id);

export const OrderActions = OrderSlice.actions

const selectBasket = (state: RootState) => state.orderReducer.basket 
const selectMyOrders = (state: RootState) => state.orderReducer.myOrders 
const selectAllOrders = (state: RootState) => state.orderReducer.myOrders 


export const OrderSelectors = {
    selectBasket,
    selectMyOrders,
    selectAllOrders
}

export default OrderSlice.reducer