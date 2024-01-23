import tableDataDevelopment from "./variables/tableDataDevelopment";
import tableDataCheck from "./variables/tableDataCheck";
import CheckTable from "./components/CheckTable";
import tableDataColumns from "./variables/tableDataColumns";
import tableDataComplex from "./variables/tableDataComplex";
import DevelopmentTable from "./components/DevelopmentTable";
import ColumnsTable from "./components/ColumnsTable";
import ComplexTable from "./components/ComplexTable";
import { useAppSelector } from "../../../../../logic/redux/reduxHooks";
import { foodSelectors, foodcontroller } from "../../../../../logic/redux/reducers/FoodReducer";
import { authSelectors, userController } from "../../../../../logic/redux/reducers/UserReducer";
import AddFoodForm from "./myOwnComponents/foodForm/AddFoodForm";
import UpdateFoodForm from "./myOwnComponents/foodForm/UpdateFoodForm";
import { OrderSelectors, ordercontroller } from "../../../../../logic/redux/reducers/OrderReducer";
import UpdateOrderForm from "./myOwnComponents/orderForm/UpdateOrderForm";

const Tables = () => {

  const allFoods = useAppSelector(foodSelectors.selectAllFoods);
  const allUsers = useAppSelector(authSelectors.selectAllUsers);
  const allOrders = useAppSelector(OrderSelectors.selectAllOrders);
  console.log("all users")
  console.log(allUsers)
  console.log("all orders")
  console.log(allOrders)
  return (
    <div>
      <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-">
        <DevelopmentTable tableData={allFoods} AddForm={<AddFoodForm tableData={allFoods} />}  controller={foodcontroller} UpdateForm={UpdateFoodForm}/>
        {/* <DevelopmentTable tableData={tableDataDevelopment} /> */}
        {/* <CheckTable tableData={tableDataCheck} /> */}
      </div>

    {/* user data table */}
      <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-">
        <DevelopmentTable tableData={allUsers} controller={userController} />
        <DevelopmentTable tableData={allOrders} controller={ordercontroller} UpdateForm={UpdateOrderForm} />

      </div>
    </div>
  );
};

export default Tables;
