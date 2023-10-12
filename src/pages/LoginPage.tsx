import React, { useState } from 'react'
import AppInput from '../components/AppInput'
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../logic/redux/reduxHooks';
import { useFormik } from 'formik';
import { authActions, authController } from '../logic/redux/reducers/AuthReducer';
import * as Yup from 'yup';
import { ROUTES } from '../utils/constants';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';

function LoginPage() {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const userSchema = Yup.object({
        email:  Yup.string().email("Le mail est invalide ").required("le mail est requis"),
        password:  Yup.string().min(4 ,  "Minimun 4 lettres please ").required("le mot de passe est requis"),
      });
    const formik = useFormik({
        initialValues: {email : "user@gmail.com"  , password : "strapiPassword" },
        validationSchema: userSchema,
        onSubmit: async (values) => {
          setIsLoading(true);
          console.log("values in login")
          console.log(values)
         const result =  await authController.login({email: values.email, password: values.password});
         if(result){
          dispatch(authActions.setAuth(result));
          console.log("reussite");
          navigate(ROUTES.homePage);
          toast.success("Login Successfully");
         } else {
           toast.error("Login Error! Retry later");
          console.log("echec");
         }
         setIsLoading(false);
        },
      });


  return (
    <div className="w-full m-auto mx-auto bg-white rounded-lg">
   <div className="text-center border-b-2 pb-2">
     <h1 style={{fontWeight : 400}} className="text-xl ">Connexion </h1>
   </div>
 
 <div className="px-6 flex flex-col justify-center items-center">

 <form onSubmit={formik.handleSubmit} className="mt-6 max-w-lg ">
       <AppInput label="email" value={formik.values.email} formik={formik} />
       <AppInput label="password" value={formik.values.password} type="password" formik={formik} />
   
        <div className="mt-6">
        <button 
        className="w-full px-6 py-2.5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
                disabled={formik.isSubmitting}
                type="submit">
                    Connexion
            </button>
            <ClipLoader
                loading={isLoading}
                size={50}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
        </div>
      </form>
   
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

export default LoginPage