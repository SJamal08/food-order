import React, { ReactNode, useState } from "react";
import CardMenu from "../../../../components/card/CardMenu";
import Card from "../../../../components/card";
import * as yup from 'yup';

import { Input, Checkbox, Typography, Button, IconButton, Drawer } from "@material-tailwind/react";
import { foodActions, foodcontroller, foodSelectors } from "../../../../../../logic/redux/reducers/FoodReducer";
import { Food } from "../../../../../../logic/model/Food";
import { getPropertiesNameFromObject, getValuesArrayFromObject } from "../../../../../../utils/functions";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";

function DeleteDrawer ({obj, action}: {obj: any, action: Function}) {
  const [openDelete, setOpenDelete] = React.useState(false);
  const openDeleteDrawer = () => setOpenDelete(true);
  const closeDeleteDrawer = () => setOpenDelete(false);

  const executeAction = () => {
    action(obj.id)
    closeDeleteDrawer();
  }
      return (
        <React.Fragment>
        <Button onClick={openDeleteDrawer} className="p-3 m-3 bg-red-600" fullWidth>Delete</Button>
        <Drawer open={openDelete} onClose={closeDeleteDrawer}>
          <div className="mb-2 flex items-center justify-between p-4">
            <Typography variant="h5" color="blue-gray">
              Contact Us
            </Typography>
            <IconButton variant="text" color="blue-gray" onClick={closeDeleteDrawer}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </IconButton>
          </div>
          <div className="flex flex-col ">
            <p>Do you want to delete line {obj.id} ?</p>
            <div className="flex w-auto">
              <Button onClick={closeDeleteDrawer} className="p-3 m-3 bg-blue-600" fullWidth>
                return
              </Button>
              <Button onClick={() => executeAction()} className="p-3 m-3 bg-red-600" fullWidth>
                delete
              </Button>
            </div>
          </div>
        </Drawer>
      </React.Fragment>
      )
}

function UpdateDrawer ({obj, action, UpdateForm}: {obj: any, action: Function, UpdateForm: any}) {
  const [openUpdate, setOpenUpdate] = React.useState(false);
  const openUpdateDrawer = () => setOpenUpdate(true);
  const closeUpdateDrawer = () => setOpenUpdate(false);

      return (
        <React.Fragment>
        <Button onClick={openUpdateDrawer} className="p-3 m-3 bg-blue-600" fullWidth>Update</Button>
        <Drawer open={openUpdate} onClose={closeUpdateDrawer}>
          <div className="mb-2 flex items-center justify-between p-4 ">
            <Typography variant="h5" color="blue-gray">
              Contact Us
            </Typography>
            <IconButton variant="text" color="blue-gray" onClick={closeUpdateDrawer}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </IconButton>
          </div>
      {UpdateForm({obj, action})}
        </Drawer>
      </React.Fragment>
      )
}

function CheckTable(props: { tableData: any, AddForm?: JSX.Element, controller: any, UpdateForm?: any}) {

  const [isHide, setIsHide] = useState(true);
  const { tableData, AddForm, controller, UpdateForm } = props;
  const headers = getPropertiesNameFromObject(tableData[0]);

  const deleteLine = async (id: number | string) => {
    console.log("start")
    // const success = await foodcontroller.delete(id);
    const success = await controller.delete(id);
    console.log("next")
    if (success) {
      let updatedList: Food[] = [...tableData];
    console.log("next2")
      updatedList = tableData.filter((food: any) => food.id !== id);
      console.log(updatedList)
      foodActions.setFoodList(updatedList);
      setData(updatedList)
    }
  }

  const updateLine = async (id: number | string, values: any, ) => {
    const updatedFood = await foodcontroller.update(id, values);
    if(updatedFood) {
      let updatedList: Food[] = [...tableData];
      const index = updatedList.findIndex((element) => element.id === id);
      if (index !== -1) {
        updatedList[index] = updatedFood;
        foodActions.setFoodList(updatedList);
        setData(updatedList)
      } 
    }
  }

  const formatLine = (info: any) => {
    if (typeof info == "object") return JSON.stringify(info);
    return info.toString();
  }
  
  const displayNewline = (data: any) => {
    const line: any = [];
    getValuesArrayFromObject(data).forEach((info: any) => {
      if(info.toString().startsWith("http"))
        line.push(<td><img className={`border-none rounded-none h-10 mx-auto`} src={info} alt="" /> </td>)
      else 
        {
          
          line.push(<td className="max-w-20 flex-1">{formatLine(info)}</td>)
        }
    }
    );
    return line;
  }

  const [data, setData] = React.useState(() => tableData);
  React.useEffect(() => {
    // Cette fonction sera appelée chaque fois que props.age change
    setData(props.tableData);
  }, [props.tableData]);
  return (
    <Card extra={"w-full h-full sm:overflow-auto px-6"}>
      <header className="relative flex items-center justify-between pt-4">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          Check Table:
        </div>

        {/* <CardMenu setAction={setAction}/> */}
        {
          isHide ? <PlusIcon  className='h-8 w-8' onClick={()=> setIsHide(false)}/> : <MinusIcon  className='h-8 w-8' onClick={()=> setIsHide(true)}/>
        }
      </header>

      <div className={`mt-8 overflow-x-scroll xl:overflow-x-hidden`}>
        {/* form */}
        <div className={`${isHide ? 'hidden':''}`}>
            {AddForm}
        </div>
        <table className="w-full">
          <thead>
            <tr>
              {
                headers.map(header => (
              <th>{header}</th>
                ))
              }
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              data.map((data: any) => (
                <tr>
                  {displayNewline(data)}
                  <td>
                    {/* <CardMenu /> */}
                    <div className="flex w-auto justify-around p-6"> 
                    {
                      UpdateForm &&
                      <UpdateDrawer obj={data} action={updateLine} UpdateForm={UpdateForm} />
                    }
                      <DeleteDrawer obj={data} action={deleteLine} />
                    </div>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </Card>
  );
}

export default CheckTable;
