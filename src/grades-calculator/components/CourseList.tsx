import {Course} from "../models/course.entity.ts";
import {useCoursesStore} from "../stores/coursesStore.ts";
import {TabPanel, TabView} from "primereact/tabview";
import {classNames} from "primereact/utils";
import {CourseTab} from "./CourseTab.tsx";

export const CourseList = () => {
  const courses: Array<Course> = useCoursesStore((state) => state.courses);

  if (courses.length === 0) {
    return (
      <p className="text-center">There are no courses registered.<br/>Press the <span className="font-semibold">Add</span> button to register a new one.</p>
    )
  }

  return (
    <TabView
      pt={{
        nav: {
          className: classNames('flex flex-1 list-none m-0 p-0', 'dark:bg-gray-900 dark:border-blue-900/40 dark:text-white/80')
        },
        previousButton: {
          className: classNames('!bg-white')
        }
      }}
      scrollable={true}
    >
      {
        courses.map((course, index) => (
          <TabPanel
            key={index}
            header={course.name}
          >
            <CourseTab course={course} index={index} />
          </TabPanel>
        ))
      }
    </TabView>
  );
};