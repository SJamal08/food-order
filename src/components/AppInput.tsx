import { Input } from '@material-tailwind/react'
import React from 'react'
import { firstLetterInUpper } from '../utils/functions'

function AppInput({type, label, value, formik} : {type?: string, label: string, value: any, formik: any}) {

  return (
    <div className='mt-6'>
          <Input type={type} size="lg" label={firstLetterInUpper(label)} value={value} name={label} onChange={formik.handleChange} crossOrigin={undefined} />

    </div>
  )
}

export default AppInput