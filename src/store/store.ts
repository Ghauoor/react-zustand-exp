import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface Habit {
  id: string;
  name: string;
  frequency: "daily" | "weekly";
  completedDates: string[];
  craetedDate: string;
}

interface HabbitState {
  habits: Habit[];
  addHabit: (name: string, frequency: "daily" | "weekly") => void;
  removeHabit: (id: string) => void;
  updateHabit: (
    id: string,
    name: string,
    frequency: "daily" | "weekly"
  ) => void;
  toggleHabit: (id: string, date: string) => void;
}

const useHabitStore = create<HabbitState>()(
  devtools(
    persist(
      (set /*get*/) => {
        return {
          habits: [],
          addHabit: (name, frequency) =>
            set((state) => {
              return {
                habits: [
                  ...state.habits,
                  {
                    id: Math.random().toString(36).substr(2, 9),
                    name,
                    frequency,
                    completedDates: [],
                    craetedDate: new Date().toISOString(),
                  },
                ],
              };
            }),

          removeHabit: (id) =>
            set((state) => {
              return {
                habits: state.habits.filter((habit) => habit.id !== id),
              };
            }),

          updateHabit: (id, name, frequency) =>
            set((state) => {
              return {
                habits: state.habits.map((habit) => {
                  if (habit.id === id) {
                    return {
                      ...habit,
                      name,
                      frequency,
                    };
                  }
                  return habit;
                }),
              };
            }),

          toggleHabit: (id, date) =>
            set((state) => {
              return {
                habits: state.habits.map((habit) => {
                  if (habit.id === id) {
                    const completedDates = habit.completedDates;
                    if (completedDates.includes(date)) {
                      return {
                        ...habit,
                        completedDates: completedDates.filter(
                          (completedDate) => completedDate !== date
                        ),
                      };
                    } else {
                      return {
                        ...habit,
                        completedDates: [...completedDates, date],
                      };
                    }
                  }
                  return habit;
                }),
              };
            }),
        };
      },
      {
        name: "habits",
      }
    )
  )
);

export default useHabitStore;
