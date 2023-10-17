import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {CourseSummary} from "../models/courseSummary.entity.ts";

type CoursesSummaryProps = {
  coursesSummary: Array<CourseSummary>;
}

export const CoursesSummaryInfo = ({coursesSummary}: CoursesSummaryProps) => {
  return (
    <section>
      <h3 className="text-xl font-semibold mb-4">Per course</h3>
      <DataTable value={coursesSummary} stripedRows={true} >
        <Column
          field="name"
          header="Name"
        />
        <Column
          field="percentage"
          header="Current % of grades"
          headerTooltip="The percentage of grades already graded."
          headerTooltipOptions={{className: "text-xs"}}
        />
        <Column
          field="currentScore"
          header="Current score"
          headerTooltip="The final grade with the available grades."
          headerTooltipOptions={{className: "text-xs"}}
        />
        <Column
          field="maxScore"
          header="Max score"
          headerTooltip="The highest possible grade in the course by achieving 20 in the rest of the exams."
          headerTooltipOptions={{className: "text-xs"}}
        />
        <Column
          field="officialScore"
          header="Official score"
          headerTooltip="The official course grade according to UPC which is the rounding of the maximum grade."
          headerTooltipOptions={{className: "text-xs"}}
        />
      </DataTable>
    </section>
  );
};