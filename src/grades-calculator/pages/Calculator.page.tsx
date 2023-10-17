import {BaseLayout} from "../../shared/components/BaseLayout.tsx";
import {ActionBar} from "../components/ActionBar.tsx";
import {CourseList} from "../components/CourseList.tsx";
import {Link} from "react-router-dom";

export const CalculatorPage = () => {
  return  (
    <BaseLayout>
      <div className="flex justify-center p-8">
        <div className="flex flex-col w-fit max-w-[370px] md:max-w-[720px] bg-white shadow-2xl rounded-xl p-4 md:py-4 md:px-8 gap-4">
          <ActionBar />
          <CourseList />
          <Link
            to="/summary"
            className="flex items-center text-semibold gap-2 rounded-full hover:bg-blue-200 w-fit px-4 py-2 duration-300"
          >
            <span className="pi pi-chart-bar"/>
            Go to summary
          </Link>
        </div>
      </div>
    </BaseLayout>
  )
};