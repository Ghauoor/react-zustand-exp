export interface Habit {
  id: string;
  name: string;
  frequency: "daily" | "weekly";
  completedDates: string[];
  createdDate: string;
}

export interface HabitState {
  habits: Habit[];
  isLoading: boolean;
  error: string | null;
  addHabit: (name: string, frequency: "daily" | "weekly") => void;
  removeHabit: (id: string) => void;
  updateHabit: (
    id: string,
    name: string,
    frequency: "daily" | "weekly"
  ) => void;
  toggleHabit: (id: string, date: string) => void;
  fetchHabits: () => Promise<void>;
}
