import {ReactElement, useState} from "react";
import {InputText} from "primereact/inputtext";
import {InputNumber} from "primereact/inputnumber";
import {Button} from "primereact/button";
import {Course} from "../models/course.entity.ts";
import {useCoursesStore} from "../stores/coursesStore.ts";
import {ConfirmDialog} from "primereact/confirmdialog";
import {classNames} from "primereact/utils";
import {toast} from "react-toastify";

type EditableCourseProps = {
  course: Course;
  index: number;
  quantityOfCourses: number;
}

export const EditableCourse = ({ course, index, quantityOfCourses }: EditableCourseProps): ReactElement => {
  const removeCourse = useCoursesStore((state) => state.removeCourse);
  const updateCourse = useCoursesStore((state) => state.updateCourse);
  const swapCoursesWithIndex = useCoursesStore((state) => state.swapCoursesWithIndex);
  const [showConfirmDialog, setShowConfirmDialog] = useState<boolean>(false);

  const updateName = (newName: string) => {
    updateCourse(index, { ...course, name: newName });
  }

  const updateCredits = (newCredits: number) => {
    updateCourse(index, { ...course, credits: newCredits });
  }

  const deleteCourse = () => {
    removeCourse(index);
    toast.success("Course deleted successfully");
  }

  const swapPreviousIndex = () => {
    const prevIndex = index - 1 < 0 ? quantityOfCourses - 1 : index - 1;
    swapCoursesWithIndex(index, prevIndex);
  }

  const swapNextIndex = () => {
    const nextIndex = index + 1 >= quantityOfCourses ? 0 : index + 1;
    swapCoursesWithIndex(index, nextIndex)
  }

  return (
    <div className="flex items-center justify-between gap-2 py-2">
      <div className="flex flex-col text-center items-center w-10 gap-0.5">
        <button
          onClick={ swapPreviousIndex }
          className="pi pi-angle-up w-full p-[3px] hover:text-blue-500"
        />
        <button
          onClick={ swapNextIndex }
          className="pi pi-angle-down w-full p-[3px] hover:text-blue-500"
        />
      </div>
      <div className="grid grid-cols-[1fr_auto_auto] md:grid-cols-[2fr_1fr_auto] items-center gap-2 px-2">
        <InputText
          value={ course.name }
          placeholder="Name"
          onChange={(e) => updateName(e.target.value)}
        />
        <InputNumber
          value={ course.credits }
          onValueChange={(e) => updateCredits(e.value!)}
          mode="decimal"
          placeholder="Credits"
          step={1}
          suffix=" credits"
          min={2}
          max={12}
          className="w-[96px]"
          inputClassName="w-[96px]"
        />
        <Button
          rounded={true}
          onClick={ () => setShowConfirmDialog(true) }
          className="ml-2 !w-10 !h-9"
          icon="pi pi-trash"
          text
          severity="danger"
          aria-label="Delete"
        />
      </div>
      <ConfirmDialog
        pt={{
          footer: {
            className: classNames('flex justify-end items-end gap-1')
          },
          content: {
            className: classNames('')
          },
          root: {
            className: classNames('w-5/6 md:w-1/2 lg:w-[720px]')
          }
        }}
        header="Confirm course deletion"
        visible={showConfirmDialog}
        onHide={() => setShowConfirmDialog(false)}
        message={`Are you sure you want to delete ${course.name}?`}
        icon="pi pi-exclamation-triangle"
        accept={deleteCourse}
        acceptIcon="pi pi-trash"
        acceptClassName="bg-red-500 border-red-500 hover:bg-red-600 hover:border-red-600"
        rejectClassName="p-button-text"
      />
    </div>
  )
}