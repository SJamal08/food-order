// export interface Root {
//     data: Data
//     meta: Meta
//   }

import { Order } from "../../../model/Order";

  
//   export interface Data {
//     id: number
//     attributes: Attributes
//   }
  
//   export interface Attributes {
//     basket: Basket[]
//     createdAt: string
//     updatedAt: string
//     publishedAt: string
//     user: User
//     isPayed: boolean
//   }
  
//   export interface Basket {
//     food: Food
//     quantity: number
//     size: string
//   }
  
//   export interface Food {
//     id: number
//     title: string
//     description: string
//     price: number
//     calories: number
//     img: string
//   }
  
//   export interface User {
//     id: number
//     email: string
//     username: string
//     customerId: string
//   }
  
//   export interface Meta {}
  
export const buildOrderFromDTO = (obj : any) : Order => {
    const data = obj.data
    const attributes = data.attributes

    //const {basket,user,isPayed} = attributes
   

    const order : Order = {
        id : data.id,
        ...attributes
    }
return order;

}