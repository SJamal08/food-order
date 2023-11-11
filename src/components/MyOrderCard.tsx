import React from 'react'
import { Order } from '../logic/model/Order'

function MyOrderCard({order}: {order: Order}) {

    const {id, user, isPayed, amount} = order;
    const {username, email} = user;
  return (
    <div className='flex flex-row items-center space-x-10 border-b-2 border-b-gray-300 mx-2 mb-2'>
      <div className='flex p-3'>
        <p className='whitespace-pre-line text-gray-500'>{`2017 \n 02 \n DEC`}</p>
      </div>
      <div className='flex-1 flex-col p-3'>
        <p className='text-gray-400'>{`Order: #${id}`}</p>
        <p className='font-bold'>{`${username}`}</p>
        <p className='text-gray-400 text-'>{`${email}`}</p>
      </div>
      <div className='flex flex-col  p-3'>
        <p className='text-gray-500'>Total</p>
        <p className=''>{`${amount}€`}</p>
      </div>
      <div className='flex flex-col p-3'>
        <p className={`${isPayed ? "text-green-500": "text-red-500"}`}>{`${isPayed ? "payed":"error"}`}</p>
      </div>
    </div>
  );
}

export default MyOrderCard