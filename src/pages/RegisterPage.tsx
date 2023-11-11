import React, { useState } from 'react'
import AppInput from '../components/AppInput'
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../logic/redux/reduxHooks';
import { useFormik } from 'formik';
import { authActions, authController } from '../logic/redux/reducers/AuthReducer';
import { ROUTES } from '../utils/constants';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import { stripeController } from '../logic/stripe/StripeController';

function RegisterPage() {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const formik = useFormik({
        initialValues: authController.registerInitialValues,
        validationSchema: authController.registerUserSchema,
        onSubmit: async (values) => {
          setIsLoading(true);
          const customerId = await stripeController.createCustomer({
            email: values.email,
            name: values.username
          });
         const result =  await authController.register({...values,customerId})
         if(result){
          dispatch(authActions.setAuth(result));
          navigate(ROUTES.homePage);
          toast.success("Registered Successfully");
         } else {
           toast.error("Register Error! Retry later");
         }
         setIsLoading(false);
        },
      });


  return (
    <div className="w-full   m-auto mx-auto bg-white rounded-lg 
    ">
   <div className="text-center border-b-2 pb-2">
     <h1 style={{fontWeight : 400}} className="text-xl ">Register </h1>
   </div>
 
 <div className="px-6 flex flex-col justify-center items-center">

 <form onSubmit={formik.handleSubmit} className="mt-6 max-w-lg ">
        <AppInput  label="username" value={formik.values.username} formik={formik} />
       <AppInput  label="email" value={formik.values.email} formik={formik} />
       <AppInput    label="password" value={formik.values.password} type="password" formik={formik} />
      {/* <ForgotPasswordButton /> */}
   
        <div className="mt-6">
        <button 
            className="w-full px-6 py-2.5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
            disabled={formik.isSubmitting}
            type="submit">
                    Inscription
            </button>
            <ClipLoader
                loading={isLoading}
                size={50}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
        </div>
      </form>

 <div className="flex items-center justify-between mt-4">
     <span className="w-1/5 border-b  lg:w-1/5" />
     <a
       href="#"
       className="text-xs text-center text-gray-500 uppercase  hover:underline"
     >
       ou se connecter avec
     </a>
     <span className="w-1/5 border-b  lg:w-1/5" />
   </div>
   
   
   <p className="mt-8 text-xs font-light text-center text-gray-400">
     {" "}
     Pas encore de compte?{" "}
     <a
    //    href={ROUTES.register}
       className="font-medium text-gray-700  hover:underline"
     >
       S'inscrire
     </a>
   </p>

 </div>

 </div>
 
  )
}

export default RegisterPage