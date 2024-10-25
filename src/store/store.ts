import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { habitActions } from "./actions";
import { HabitState } from "./types";

const useHabitStore = create<HabitState>()(
  devtools(persist(habitActions, { name: "habits" }))
);

export default useHabitStore;
