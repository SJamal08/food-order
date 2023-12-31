import tableDataDevelopment from "./variables/tableDataDevelopment";
import tableDataCheck from "./variables/tableDataCheck";
import CheckTable from "./components/CheckTable";
import tableDataColumns from "./variables/tableDataColumns";
import tableDataComplex from "./variables/tableDataComplex";
import DevelopmentTable from "./components/DevelopmentTable";
import ColumnsTable from "./components/ColumnsTable";
import ComplexTable from "./components/ComplexTable";
import { useAppSelector } from "../../../../../logic/redux/reduxHooks";
import { foodSelectors } from "../../../../../logic/redux/reducers/FoodReducer";

const Tables = () => {

  const allFoods = useAppSelector(foodSelectors.selectAllFoods);
  return (
    <div>
      <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-">
        <DevelopmentTable tableData={allFoods} />
        {/* <DevelopmentTable tableData={tableDataDevelopment} /> */}
        {/* <CheckTable tableData={tableDataCheck} /> */}
      </div>

      <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-2">
        <ColumnsTable tableData={tableDataColumns} />

        <ComplexTable tableData={tableDataComplex} />
      </div>
    </div>
  );
};

export default Tables;
