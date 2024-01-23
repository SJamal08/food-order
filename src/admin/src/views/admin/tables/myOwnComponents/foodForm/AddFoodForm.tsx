import { useFormik } from 'formik';
import React, { useState } from 'react';
import * as yup from 'yup';
import { foodActions, foodcontroller } from '../../../../../../../logic/redux/reducers/FoodReducer';
import { Food } from '../../../../../../../logic/model/Food';
import AppInput from '../../../../../../../components/AppInput';
import { Button } from '@material-tailwind/react';

function AddFoodForm(props: { tableData: any }) {

  let { tableData } = props;

  const yupSchema = yup.object().shape({
    title: yup.string().min(3).max(30).required(),
    description: yup.string().min(3).max(500).required(),
    price: yup.number().required(),
    calories: yup.number().required(),
    img: yup.string().min(3).required(),
  });

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      price: 0,
      calories: 0,
      img: '',
    },
    validationSchema: yupSchema,
    onSubmit: async (values) => {
          const newFood = await foodcontroller.create(values);
          let updatedList: Food[] = [...tableData,newFood];
          foodActions.setFoodList(updatedList);
          // setData(updatedList)
          tableData = updatedList;
    },
  });

  // const [data, setData] = useState(tableData);
  return (
            <div className="mt-8 ">
        {/* form */}
        <form className={`mt-8 mb-2 max-w-screen sm:w-96`} onSubmit={formik.handleSubmit}>
          <div className="mb-4 flex flex-wrap gap-6">

            <AppInput label="title" value={formik.values.title} formik={formik} />
            <AppInput  label="description"  value={formik.values.description} formik={formik} />
            <AppInput type="number"  label="price" value={formik.values.price} formik={formik} />
            <AppInput type="number"  label="calories"  value={formik.values.calories} formik={formik} />
            <AppInput type="text"  label="img"  value={formik.values.img} formik={formik} />
          </div>

          <Button type="submit" className="mt-6" fullWidth>
            enter
          </Button>
        </form>
      hello
    </div>
  )
}

export default AddFoodForm