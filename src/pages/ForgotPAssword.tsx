import React, { useState } from 'react'
import AppInput from '../components/AppInput'
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../logic/redux/reduxHooks';
import { useFormik } from 'formik';
import { authActions, authController } from '../logic/redux/reducers/AuthReducer';
import { ROUTES } from '../utils/constants';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';

function ForgotPAssword() {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const formik = useFormik({
        initialValues: authController.forgotInitialValues,
        validationSchema: authController.forgotUserSchema,
        onSubmit: async (values) => {
          console.log("values")
          console.log(values)
          // setIsLoading(true);
         const result =  await authController.forgotPassword({email: values.email});
         console.log("result")
         console.log(result)
        //  if(result){
        //   dispatch(authActions.setAuth(result));
        //   navigate(ROUTES.homePage);
        //   toast.success("Login Successfully");
        //  } else {
        //    toast.error("Login Error! Retry later");
        //  }
        //  setIsLoading(false);
        },
      });


  return (
    <div className="w-full m-auto mx-auto bg-white rounded-lg">
   <div className="text-center border-b-2 pb-2">
     <h1 style={{fontWeight : 400}} className="text-xl "> FORGOT PASSWORD </h1>
   </div>
 
 <div className="px-6 flex flex-col justify-center items-center">

 <form onSubmit={formik.handleSubmit} className="mt-6 max-w-lg ">
       <AppInput label="email" value={formik.values.email} formik={formik} />
   
        <div className="mt-6">
        <button 
        className="w-full px-6 py-2.5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
                disabled={formik.isSubmitting}
                type="submit">
                    Submit
            </button>
            <ClipLoader
                loading={isLoading}
                size={50}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
        </div>
      </form>
   

 </div>

 </div>
 
  )
}

export default ForgotPAssword