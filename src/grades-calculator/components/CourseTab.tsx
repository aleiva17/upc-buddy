import {ReactElement, useState} from "react";
import {Course} from "../models/course.entity.ts";
import {Button} from "primereact/button";
import {AddGradeForm} from "./AddGradeForm.tsx";
import {Message} from "primereact/message";
import {EditableGrade} from "./EditableGrade.tsx";

type CourseTabProps = {
  course: Course;
  index: number;
}

export const CourseTab = ({course, index}: CourseTabProps): ReactElement => {
  const [addGradeDialogVisible, setAddGradeDialogVisible] = useState<boolean>(false);

  const invalidSumOfPercentages = () => {
    let sum = 0;
    course.grades.forEach((grade) => sum += grade.percentage);
    return sum > 100;
  }

  return (
    <div className="w-full">
      <div className="flex justify-between w-full mb-2">
        <h2 className="text-lg font-semibold mb-3"><span className="text-blue-600">{course.name}</span> grades:</h2>
        <Button
          icon="pi pi-plus"
          rounded={true}
          tooltip="Add a grade"
          tooltipOptions={{className: "text-sm"}}
          className="!w-8 !h-8"
          size="small"
          onClick={ () => setAddGradeDialogVisible(true) }
        />
        <AddGradeForm
          courseIndex={index}
          isVisible={addGradeDialogVisible}
          closeDialog={ () => setAddGradeDialogVisible(false) }
        />
      </div>
      {
        invalidSumOfPercentages() &&
          <Message
            className="mb-2"
            severity="error"
            text="The sum of the percentages is greater than 100%"
          />
      }
      <ul className="flex flex-col gap-2">
        {
          course.grades.length === 0
            ? <p className="text-center">There are no grades registered.<br/>Press the + button to add a new grade.</p>
            : course.grades.map((grade, gIndex) =>
              <EditableGrade
                key={gIndex}
                grade={grade}
                gradeIndex={gIndex}
                courseIndex={index}
                quantityOfGrades={course.grades.length}
              />
            )
        }
      </ul>
    </div>
  );
};