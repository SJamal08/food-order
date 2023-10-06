import React from 'react'
import AppInput from '../components/AppInput'
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../logic/redux/reduxHooks';
import { useFormik } from 'formik';
import { authActions, authController } from '../logic/redux/reducers/AuthReducer';
import * as Yup from 'yup';

function LoginPage() {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const userSchema = Yup.object({
        email:  Yup.string().email("Le mail est invalide ").required("le mail est requis"),
        password:  Yup.string().min(4 ,  "Minimun 4 lettres please ").required("le mot de passe est requis"),
      });
    const formik = useFormik({
        initialValues: {email : "user@strapi.io"  , password : "strapiPassword" },
        validationSchema: userSchema,
        onSubmit: async (values) => {
         const result =  await authController.login({email: values.email, password: values.password})
         console.log("result apres login")
         console.log(result)
         if(result){
          dispatch(authActions.setAuth(result));
          console.log("reussite")
          navigate("/")
         }
          // formik.setSubmitting(false)
        //   setTimeout(() => {
        //     navigate(routes.home);
        // }, 300);
        },
      });


  return (
    <div className="w-full   m-auto mx-auto bg-white rounded-lg 
    ">
   <div className="text-center border-b-2 pb-2">
     <h1 style={{fontWeight : 400}} className="text-xl ">Connexion </h1>
   </div>
 
 <div className="px-6 flex flex-col justify-center items-center">

 <form onSubmit={formik.handleSubmit} className="mt-6 max-w-lg ">
       <AppInput  label="Email" value={formik.values.email} formik={formik} />
       <AppInput    label="Mot de passe" value={formik.values.email} type="password" formik={formik} />
      {/* <ForgotPasswordButton /> */}
   
        <div className="mt-6">
        <button 
        className="w-full px-6 py-2.5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
                disabled={formik.isSubmitting}
                type="submit">
                    Connexion
            </button>
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

export default LoginPage