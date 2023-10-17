import {Course} from "../../grades-calculator/models/course.entity.ts";
import {ReactElement} from "react";

type JsonCoursesPreviewProps = {
  courses: Array<Course>;
  fileName: string;
}

export const JsonCoursesPreview = ({ courses, fileName }: JsonCoursesPreviewProps): ReactElement => {
  return (
    <div>
      <h3 className="text-lg">Preview of <span className="font-semibold">{fileName}</span>:</h3>
      <ul className="list-disc list-inside mt-1">
        {
          courses.map((course) => (
            <li className="mb-2">{ course.name } ({ course.credits } credits)
              {
                course.grades.length !== 0 &&
                  <ul className="text-sm ml-12">
                    {
                      course.grades.map((grade) => (
                        <li><span className="font-medium">{ grade.name }</span> - Score: <span className="font-medium">{ grade.score != null ? grade.score : "Not registered" } ({ grade.percentage }%)</span></li>
                      ))
                    }
                  </ul>
              }
            </li>
          ))
        }
      </ul>
    </div>
  )
}