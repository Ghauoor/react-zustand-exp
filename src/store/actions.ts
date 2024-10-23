import { StateCreator } from "zustand";
import { HabitState, Habit } from "./types";

export const habitActions: StateCreator<HabitState> = (set, get) => ({
  habits: [],
  isLoading: false,
  error: null,

  addHabit: (name, frequency) => {
    const newHabit: Habit = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      frequency,
      completedDates: [],
      createdDate: new Date().toISOString(),
    };
    set((state) => ({ habits: [...state.habits, newHabit] }));
  },

  removeHabit: (id) => {
    set((state) => ({
      habits: state.habits.filter((habit) => habit.id !== id),
    }));
  },

  updateHabit: (id, name, frequency) => {
    set((state) => ({
      habits: state.habits.map((habit) =>
        habit.id === id ? { ...habit, name, frequency } : habit
      ),
    }));
  },

  toggleHabit: (id, date) => {
    set((state) => ({
      habits: state.habits.map((habit) => {
        if (habit.id !== id) return habit;

        const completedDates = habit.completedDates.includes(date)
          ? habit.completedDates.filter((d) => d !== date)
          : [...habit.completedDates, date];

        return { ...habit, completedDates };
      }),
    }));
  },

  fetchHabits: async () => {
    if (get().habits.length > 0) return;

    set({ isLoading: true });
    const mockHabits: Habit[] = [
      {
        id: "1",
        name: "Read a book",
        frequency: "daily",
        completedDates: [],
        createdDate: new Date().toISOString(),
      },
      {
        id: "2",
        name: "Exercise",
        frequency: "weekly",
        completedDates: [],
        createdDate: new Date().toISOString(),
      },
    ];

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      set({ habits: mockHabits, isLoading: false });
    } catch (error) {
      set({ error: "Error fetching habits", isLoading: false });
    }
  },
});
