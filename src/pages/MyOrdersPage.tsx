import React from 'react'
import { useAppSelector } from '../logic/redux/reduxHooks';
import { OrderSelectors } from '../logic/redux/reducers/OrderReducer';
import MyOrderCard from '../components/MyOrderCard';

function MyOrdersPage() {

    const orders = useAppSelector(OrderSelectors.selectMyOrders);
    console.log(orders)
  return (
    <div>
      
      {
        orders.map((order: any, index: number) => (
            <MyOrderCard order={order} key={index} />
        ))
      }
    </div>
  );
}

export default MyOrdersPage