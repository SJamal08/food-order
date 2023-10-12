import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom';
import { ordercontroller } from '../logic/redux/reducers/OrderReducer';
import { authSelectors } from '../logic/redux/reducers/AuthReducer';
import { useAppSelector } from '../logic/redux/reduxHooks';

function SuccessPayment() {

    const [searchParams, setSearchParams] = useSearchParams();
  const user = useAppSelector(authSelectors.selectUser);


    useEffect(() => {
        const checkOrder = async () => {
            if(!orderId || !user) return;
            const order = await ordercontroller.getOneById(parseInt(orderId));

            console.log("order")
            console.log(order)

            console.log("connected user")
            console.log(user)

            // if (!order || ( order.user.id !== user?.id ) || order.isPayed ) return;
            console.log("test")
            const updatedOrder = await ordercontroller.update(orderId, {user: {username: "Richard"}});

            if (updatedOrder) {
                console.log("reussite")
            }

        }
        checkOrder();
    }, [user])

    // http://localhost:3000/orderSuccess?orderId=17&payment_intent=pi_3O0WLoLU9GLKhQYp1ROBN4rn&payment_intent_client_secret=pi_3O0WLoLU9GLKhQYp1ROBN4rn_secret_JNdRQUewfSSfKh4kw8NHkTVVH&redirect_status=succeeded
    

    const orderId = searchParams.get('orderId');
  return (
    <div className="bg-gray-100 h-screen">
  <div className="bg-white p-6  md:mx-auto">
    <svg viewBox="0 0 24 24" className="text-green-600 w-16 h-16 mx-auto my-6">
      <path
        fill="currentColor"
        d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
      ></path>
    </svg>
    <div className="text-center">
      <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
        Payment Done! {orderId}
      </h3>
      <p className="text-gray-600 my-2">
        Thank you for completing your secure online payment.
      </p>
      <p> Have a great day!</p>
      <div className="py-10 text-center">
        <a
          href="#"
          className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3"
        >
          GO BACK
        </a>
      </div>
    </div>
  </div>
</div>

  )
}

export default SuccessPayment