import { CartItem } from "../logic/model/CartItem";

export const getBasketPrice = (basket: CartItem[]) => {
    return basket.reduce((previous, current) => previous + (current.food.price * current.quantity) , 0 );
}

export const getTotalPrice = (basket: CartItem[], discount: number, fees: number) => {
    const basketPrice = getBasketPrice(basket);
    let total = basketPrice;
    total = (total - (total / discount)) + fees;
    return total.toFixed(2);
  }

// class BasketLogic {
//     public basket: CartItem[];
//     constructor(basket: CartItem[]) {
//         this.basket = basket;
//     }

//     getBasketPrice = () => {
//         return this.basket.reduce((previous, current) => previous + (current.food.price * current.quantity) , 0 );
//     }
    
//     getTotalPrice = (discount: number, fees: number) => {
//         const basketPrice = getBasketPrice(this.basket);
//         let total = basketPrice;
//         total = (total - (total / discount)) + fees;
//         return total.toFixed(2);
//       }
// }