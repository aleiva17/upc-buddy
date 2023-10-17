import {Course} from "../models/course.entity.ts";
import {CourseSummary} from "../models/courseSummary.entity.ts";
import {SemesterSummary} from "../models/semesterSummary.entity.ts";


export const getCoursesSummaries = (courses: Array<Course>): Array<CourseSummary> => {
  const coursesSummaries: Array<CourseSummary> = [];

  courses.forEach((course) => {
    let sumOfValidPercentage = 0;
    let currentScore = 0;

    course.grades.forEach((grade) => {
      if (grade.score == undefined) return;
      sumOfValidPercentage += grade.percentage;

      const gradeInput = grade.percentage * grade.score / 100;

      currentScore += parseFloat(gradeInput.toFixed(2));
    });

    const missingPercentage = 100 - sumOfValidPercentage;
    const maxScore = missingPercentage * 0.20 + parseFloat(currentScore.toFixed(2));
    const officialScore = Math.round(maxScore);

    coursesSummaries.push({
      name: course.name,
      credits: course.credits,
      percentage: `${sumOfValidPercentage}%`,
      currentScore: currentScore.toFixed(2),
      maxScore: maxScore.toFixed(2),
      officialScore: officialScore.toString(),
    });
  });

  return coursesSummaries;
};

export const getSemesterSummary = (coursesSummaries: Array<CourseSummary>): SemesterSummary => {
  const totalCredits = coursesSummaries.reduce((sum, courseSummary) => sum + courseSummary.credits, 0);

  const semesterSummary: SemesterSummary = {
    score: 0,
    currentScore: 0,
    missingScore: 0
  };

  coursesSummaries.forEach((courseSummary) => {
    semesterSummary.score += courseSummary.credits / totalCredits * parseFloat(courseSummary.officialScore);
    semesterSummary.currentScore += courseSummary.credits / totalCredits * parseFloat(courseSummary.currentScore);
  });

  semesterSummary.missingScore = parseFloat(semesterSummary.score.toFixed(2)) - parseFloat(semesterSummary.currentScore.toFixed(2));

  return semesterSummary;
}
