import {Button} from "primereact/button";
import {useState} from "react";
import {AddCourseForm} from "./AddCourseForm.tsx";
import {EditCoursesForm} from "./EditCoursesForm.tsx";

export const ActionBar = () => {
  const [addCourseDialogVisible, setAddCourseDialogVisible] = useState<boolean>(false)
  const [editCoursesDialogVisible, setEditCoursesDialogVisible] = useState<boolean>(false);


  return (
    <div className="flex items-center justify-between w-full gap-8">
      <h2 className="text-2xl font-bold">Courses: </h2>
      <div className="flex gap-1">
        <Button
          onClick={ () => setAddCourseDialogVisible(true) }
          label="Add"
          size="small"
          icon="pi pi-plus"
        />
        <Button
          onClick={ () => setEditCoursesDialogVisible(true) }
          label="Edit"
          size="small"
          severity="warning"
          icon="pi pi-pencil"
        />
      </div>
      <AddCourseForm
        isVisible={ addCourseDialogVisible }
        closeDialog={ () => setAddCourseDialogVisible(false) }
      />
      <EditCoursesForm
        isVisible={ editCoursesDialogVisible }
        closeDialog={ () => setEditCoursesDialogVisible(false) }
      />
    </div>
  )
}