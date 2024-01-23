import React from 'react'
import AppInput from '../../../../../../../components/AppInput'
import { Button } from '@material-tailwind/react'
import { useFormik } from 'formik';
import * as yup from 'yup';


function UpdateFoodForm( props: {obj: any, action: any}) {
    const {obj, action} = props;

    const yupSchema = yup.object().shape({
        title: yup.string().min(3).max(30).required(),
        description: yup.string().min(3).max(500).required(),
        price: yup.number().required(),
        calories: yup.number().required(),
        img: yup.string().min(3).required(),
      });

    const formik = useFormik({
        initialValues: {
          title: obj.title,
          description: obj.description,
          price: obj.price,
          calories: obj.calories,
          img: obj.img,
        },
        validationSchema: yupSchema,
        onSubmit: async (values) => {
         executeAction(values)
        },
      });
    
      const executeAction = (values: any) => {
        action(obj.id, values)
        // closeUpdateDrawer()
      }
  return (
    <div className='h-full overflow-y-scroll'>
    <form className={`mt-2 mb-2 max-w-96 `} onSubmit={formik.handleSubmit}>
        <div className="mb-4 gap-6 flex flex-col">
          <AppInput label="title" value={formik.values.title} formik={formik} />
          <AppInput  label="description"  value={formik.values.description} formik={formik} />
          <AppInput type="number"  label="price" value={formik.values.price} formik={formik} />
          <AppInput type="number"  label="calories"  value={formik.values.calories} formik={formik} />
          <AppInput type="text"  label="img"  value={formik.values.img} formik={formik} />
        </div>
          <Button type="submit" className="" fullWidth>
            enter
          </Button>

      </form>
    </div>
  )
}

export default UpdateFoodForm