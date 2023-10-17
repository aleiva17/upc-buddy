import {Grade} from "./grade.entity.ts";

export interface Course {
  name: string;
  credits: number;
  grades: Array<Grade>;
}