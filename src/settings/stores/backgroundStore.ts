import {create} from "zustand";
import {persist} from "zustand/middleware";
import {BackgroundType} from "../../shared/models/backgroundType.enum.ts";

interface CoursesState {
  background: BackgroundType;
  setBackground: (newBackground: BackgroundType) => void;
}

export const useBackgroundStore = create<CoursesState>()(persist(((set) => ({
  background: BackgroundType.CLEAR_NIGHT,
  setBackground: (newBackground: BackgroundType) => set(() => ({
    background: newBackground
  }))
})), {
  name: "background"
}))