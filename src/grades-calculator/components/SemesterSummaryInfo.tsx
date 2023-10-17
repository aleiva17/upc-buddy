import {SemesterSummary} from "../models/semesterSummary.entity.ts";

type SemesterSummaryProps = {
  semesterSummary: SemesterSummary
}

export const SemesterSummaryInfo = ({ semesterSummary }: SemesterSummaryProps) => {
  return (
    <section>
      <h3 className="text-xl font-semibold mb-4">General</h3>
      <p>Your maximum possible grade for this semester (based on your current grades and considering you get 20 on your remaining exams) is:</p>
      <p className="text-center text-3xl font-extrabold py-3">{ semesterSummary.score.toFixed(2) }</p>
      <p>Currently, your semester score is <span className="font-bold">{ semesterSummary.currentScore.toFixed(2) }</span>. So, you are still fighting for <span className="font-bold">{ semesterSummary.missingScore }</span> points.</p>
    </section>
  );
};