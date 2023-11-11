import {Elements} from '@stripe/react-stripe-js';
import {PaymentIntent, loadStripe} from '@stripe/stripe-js';
import {useStripe, useElements, PaymentElement} from '@stripe/react-stripe-js';
// import { PaymentIntentDTO } from '../logic/stripe/paymentIntentDTO';
import data from '../logic/stripe/paymentData.json';
import { useEffect, useState } from 'react';
import { stripeController } from '../logic/stripe/StripeController';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../logic/redux/reduxHooks';
import { authSelectors } from '../logic/redux/reducers/AuthReducer';
import { PaymentIntentDTO } from '../logic/stripe/paymentIntentDTO';
import { OrderSelectors, ordercontroller } from '../logic/redux/reducers/OrderReducer';
import { OrderPayload } from '../logic/repositories/OrderRepo/IOrderRepo';
import { ROUTES } from '../utils/constants';
import { toast } from 'react-toastify';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const publish_key= process.env.REACT_APP_PUBLISHABLE_KEY!;

const CheckoutForm = ({amount}: { amount: number}) => {
    const stripe = useStripe();
    const elements = useElements();
    const user = useAppSelector(authSelectors.selectUser);
    const basket = useAppSelector(OrderSelectors.selectBasket);
    const navigate = useNavigate();

    useEffect(() => {
      if(!user) {
        navigate(ROUTES.loginPage)
        return;
      }
    }, [navigate, user])
    
  
    const handleSubmit = async (event: any) => {
      // We don't want to let default form submission happen here,
      // which would refresh the page.
      event.preventDefault();
  
      if (!stripe || !elements) {
        // Stripe.js hasn't yet loaded.
        // Make sure to disable form submission until Stripe.js has loaded.
        return;
      }
      const order: OrderPayload = {
        basket: basket, 
        user: user!,
        amount: amount
      }
      const orderCreated = await ordercontroller.create(order);
      if(orderCreated){
        console.log("reussite");
      // navigate(ROUTES.homePage);
      // toast.success("order registered Successfully");
      } else {
      toast.error("order Error! Retry later");
      console.log("echec");
   }
  console.log(orderCreated)
  
      const result = await stripe.confirmPayment({
        //`Elements` instance that was used to create the Payment Element
        elements,
        confirmParams: {
          return_url: `http://localhost:3000/orderSuccess?orderId=${orderCreated?.id}`,
        },
        // redirect: 
      });
  
      if (result.error) {
        // Show error to your customer (for example, payment details incomplete)
        console.log(result.error.message);
      } else {
        // Your customer will be redirected to your `return_url`. For some payment
        // methods like iDEAL, your customer will be redirected to an intermediate
        // site first to authorize the payment, then redirected to the `return_url`.
    };
  }
    return (
      <form onSubmit={handleSubmit}>
        <PaymentElement />
        <button disabled={!stripe}>Submit</button>
      </form>
    )
  };

const stripePromise = loadStripe(publish_key);


export default function PaymentStripePage() {

  const location = useLocation();
  const {amount} = location.state;
  const user = useAppSelector(authSelectors.selectUser);

  const [clientSecret, setclientSecret] = useState<string | undefined>();

  useEffect(() => {
    const createNewPaymentIntentId = async () => {
      const data: PaymentIntentDTO = await stripeController.createPaymentIntent({
        amount: amount,
        customer: user!.customerId,
        description: `order for ${user?.username}`,
        currency: 'eur',
        payment_method_types: ['card']
      });
      console.log(data)
      setclientSecret(data.client_secret);
    }
    createNewPaymentIntentId();
  }, [amount, user])
  
  const options = {
    // passing the client secret obtained from the server
    clientSecret,
    // clientSecret: 'pi_3NziCMLU9GLKhQYp1XbRRJaV_secret_kj01slvJ5f8fBR0r3xxa04znH',
    // clientSecret: data.client_secret,
  };

  return (
    <div className='max-w-xl mx-auto mt-5 p-5'>
      {
        !clientSecret ? 
        <div>
          error
        </div> :
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm amount={amount}/>
        </Elements>
      }

    </div>
  );
};