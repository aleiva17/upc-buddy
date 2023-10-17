import {Grade} from "../models/grade.entity.ts";
import {ReactElement, useState} from "react";
import {InputText} from "primereact/inputtext";
import {InputNumber} from "primereact/inputnumber";
import {useCoursesStore} from "../stores/coursesStore.ts";
import {Button} from "primereact/button";
import {classNames} from "primereact/utils";
import {ConfirmDialog} from "primereact/confirmdialog";
import {toast} from "react-toastify";

type GradeFormProps = {
  grade: Grade;
  courseIndex: number;
  gradeIndex: number;
  quantityOfGrades: number;
}

export const EditableGrade = ({ grade, courseIndex, gradeIndex, quantityOfGrades }: GradeFormProps): ReactElement => {
  const [isConfirmDeletionVisible, setIsConfirmDeletionVisible] = useState<boolean>(false);
  const updateGrade = useCoursesStore((state) => state.updateGrade);
  const removeGrade = useCoursesStore((state) => state.removeGrade);
  const swapGrades = useCoursesStore((state) => state.swapGradesWithIndexFromCourseWithIndex);

  const updateName = (newName: string) => {
    updateGrade(gradeIndex, courseIndex, { ...grade, name: newName });
  }

  const updatePercentage = (newPercentage: number) => {
    updateGrade(gradeIndex, courseIndex, { ...grade, percentage: newPercentage });
  }

  const updateScore = (newScore: number) => {
    updateGrade(gradeIndex, courseIndex, { ...grade, score: newScore });
  }

  const deleteGrade = () => {
    removeGrade(gradeIndex, courseIndex);
    toast.success("Grade deleted successfully");
  }

  const swapPreviousIndex = () => {
    const prevIndex = gradeIndex - 1 < 0 ? quantityOfGrades - 1 : gradeIndex - 1;
    swapGrades(courseIndex, gradeIndex, prevIndex);
  }

  const swapNextIndex = () => {
    const nextIndex = gradeIndex + 1 >= quantityOfGrades ? 0 : gradeIndex + 1;
    swapGrades(courseIndex, gradeIndex, nextIndex);
  }

  return (
    <li className="flex items-center gap-2">
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
      <InputText
        className="w-[74px]"
        value={grade.name}
        onChange={(e) => updateName(e.target.value)}
        placeholder="Name"
      />
      <InputNumber
        className="w-[74px]"
        inputClassName="w-[74px]"
        value={grade.percentage}
        onChange={(e) => updatePercentage(e.value!)}
        placeholder="%"
        suffix="%"
      />
      <InputNumber
        className="w-[74px]"
        inputClassName="w-[74px]"
        value={grade.score}
        onChange={(e) => updateScore(e.value!)}
        placeholder="Score"
        minFractionDigits={0}
        maxFractionDigits={2}
      />
      <Button
        rounded={true}
        onClick={ () => setIsConfirmDeletionVisible(true) }
        className="ml-2 !w-10 !h-9"
        icon="pi pi-trash"
        text
        severity="danger"
        aria-label="Delete"
      />
      <ConfirmDialog
        pt={{
          footer: {
            className: classNames('flex justify-end items-end gap-2')
          },
          content: {
            className: classNames('')
          },
          root: {
            className: classNames('w-5/6 md:w-1/2 lg:w-[420px]')
          }
        }}
        header="Confirm grade deletion"
        draggable={false}
        visible={isConfirmDeletionVisible}
        onHide={() => setIsConfirmDeletionVisible(false)}
        message={`Are you sure you want to delete this grade?`}
        icon="pi pi-exclamation-triangle"
        accept={ deleteGrade }
        acceptIcon="pi pi-trash"
        acceptClassName="bg-red-500 border-red-500 hover:bg-red-600 hover:border-red-600"
        rejectClassName="p-button-text"
      />
    </li>
  )
}