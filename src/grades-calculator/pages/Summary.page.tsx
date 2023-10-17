import {ReactElement} from "react";
import {BaseLayout} from "../../shared/components/BaseLayout.tsx";
import {useCoursesStore} from "../stores/coursesStore.ts";
import {getCoursesSummaries, getSemesterSummary} from "../services/summary.service.tsx";
import {Link} from "react-router-dom";
import {CoursesSummaryInfo} from "../components/CoursesSummaryInfo.tsx";
import {SemesterSummaryInfo} from "../components/SemesterSummaryInfo.tsx";


export const SummaryPage = (): ReactElement => {
  const courses = useCoursesStore((state) => state.courses);
  const coursesSummary = getCoursesSummaries(courses);
  const semesterSummary = getSemesterSummary(coursesSummary);

  return (
    <BaseLayout>
      <div className="flex justify-center p-8">
        <div className="flex flex-col w-[370px] md:w-[720px] bg-white shadow-2xl rounded-xl p-4 md:py-4 md:px-8 gap-4">
          <h2 className="text-3xl font-bold">Summary</h2>
          {
            courses.length !== 0 ?
              <>
                <CoursesSummaryInfo coursesSummary={coursesSummary} />
                <SemesterSummaryInfo semesterSummary={semesterSummary}/>
              </>
            :
              <div className="flex flex-col items-center gap-4">
                <p className="text-center">There are no courses registered.</p>
                <Link to="/" className="bg-blue-400 hover:bg-blue-300 font-semibold px-4 py-2 rounded-full duration-300">
                  Start adding courses
                </Link>
              </div>
          }
        </div>
      </div>
    </BaseLayout>
  );
};