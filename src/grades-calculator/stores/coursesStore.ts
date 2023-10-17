import { create } from 'zustand'
import {Course} from "../models/course.entity.ts";
import {Grade} from "../models/grade.entity.ts";
import { persist } from "zustand/middleware";

interface CoursesState {
  courses: Array<Course>;
  setCourses: (courses: Array<Course>) => void;
  addCourse: (course: Course) => void;
  addGrade: (grade: Grade, courseIndex: number) => void;
  updateCourse: (index: number, course: Course) => void;
  updateGrade: (gradeIndex: number, courseIndex: number, grade: Grade) => void;
  removeCourse: (index: number) => void;
  removeGrade: (gradeIndex: number, courseIndex: number) => void;
  swapCoursesWithIndex: (firstIndex: number, secondIndex: number) => void;
  swapGradesWithIndexFromCourseWithIndex: (courseIndex: number, firstGradeIndex: number, secondGradeIndex: number) => void;
}

export const useCoursesStore = create<CoursesState>()(persist(((set) => ({
  courses: [],
  setCourses: (courses: Array<Course>) => set(() => ({
    courses: [...courses]
  })),
  addCourse: (course: Course) => set((state) => ({
    courses: [...state.courses, course]
  })),
  addGrade: (grade: Grade, courseIndex: number) => set((state) => ({
    courses: state.courses.map((course, currentIndex) =>
      currentIndex !== courseIndex
        ? course
        : {
          ...course,
          grades: [...course.grades, {...grade}]
        })
  })),
  updateCourse: (index: number, course: Course) => set((state) => ({
    courses: state.courses.map((existingCourse, currentIndex) =>
      currentIndex !== index ? existingCourse : { ...course }
    )
  })),
  updateGrade: (gradeIndex: number, courseIndex: number, grade: Grade) => set((state) => ({
    courses: state.courses.map((existingCourse, currentCourseIndex) =>
      currentCourseIndex !== courseIndex
        ? existingCourse
        : {
          ...existingCourse,
          grades: existingCourse.grades.map((existingGrade, currentGradeIndex) =>
            currentGradeIndex !== gradeIndex ? existingGrade : { ...grade }
          )
        }
    )
  })),
  removeCourse: (index: number) => set((state) => ({
    courses: state.courses.filter((_, currentCourseIndex) => currentCourseIndex !== index)
  })),
  removeGrade: (gradeIndex: number, courseIndex: number) => set((state) => ({
    courses: state.courses.map((existingCourse, currentCourseIndex) =>
      currentCourseIndex !== courseIndex
        ? existingCourse
        : {
          ...existingCourse,
          grades: existingCourse.grades.filter((_, currentGradeIndex) =>
            currentGradeIndex !== gradeIndex
          )
        }
    )
  })),
  swapCoursesWithIndex: (firstIndex: number, secondIndex: number) => set((state) => {
    const newCourses = [...state.courses];
    const tempCourse: Course = { ...newCourses[firstIndex] };

    newCourses[firstIndex] = { ...newCourses[secondIndex] };
    newCourses[secondIndex] = { ...tempCourse };

    return { courses: newCourses };
  }),
  swapGradesWithIndexFromCourseWithIndex: (courseIndex: number, firstGradeIndex: number, secondGradeIndex: number) => set((state) => {
    const coursesWithGradesUpdated = [...state.courses];
    const courseToUpdate = coursesWithGradesUpdated[courseIndex];
    const tempGrade = courseToUpdate.grades[firstGradeIndex];

    courseToUpdate.grades[firstGradeIndex] = { ...courseToUpdate.grades[secondGradeIndex] };
    courseToUpdate.grades[secondGradeIndex] = { ...tempGrade };

    return { courses: coursesWithGradesUpdated };
  })
})), {
  name: "courses"
}))