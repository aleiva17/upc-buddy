import {ReactElement} from "react";
import {Dialog} from "primereact/dialog";
import {Button} from "primereact/button";
import {useCoursesStore} from "../stores/coursesStore.ts";
import {EditableCourse} from "./EditableCourse.tsx";

type EditCourseFormProps = {
  isVisible: boolean;
  closeDialog: () => void;
}

export const EditCoursesForm = ({ isVisible, closeDialog }: EditCourseFormProps): ReactElement => {
  const courses = useCoursesStore((state) => state.courses);

  return (
    <Dialog
      header="Edit a course"
      visible={ isVisible }
      className="!w-[90%] md:!w-1/2 lg:!w-fit"
      onHide={ closeDialog }
      draggable={false}
    >
      <div className="flex flex-col justify-around">
        <p className="text-gray-500 text-sm mb-8">All changes are automatically saved.</p>
        <div className="flex flex-col justify-around">
          {
            courses.map((course, index) =>
              <EditableCourse
                key={index}
                course={course}
                index={index}
                quantityOfCourses={courses.length}
              />
            )
          }
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <Button
          label="Close"
          icon="pi pi-times"
          onClick={ closeDialog }
        />
      </div>
    </Dialog>
  );
};