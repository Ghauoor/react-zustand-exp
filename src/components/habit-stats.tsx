import React, { useMemo } from "react";
import { Paper, Typography, Box, LinearProgress } from "@mui/material";
import useHabitStore from "../store/store";
import { Habit } from "../store/types";

const HabitStats: React.FC = () => {
  const habits = useHabitStore((state) => state.habits);
  const isLoading = useHabitStore((state) => state.isLoading);
  const error = useHabitStore((state) => state.error);

  const totalHabits = useMemo(() => habits.length, [habits]);

  const completedToday = useMemo(() => {
    const today = new Date().toISOString().split("T")[0];
    return habits.filter((habit) => habit.completedDates.includes(today))
      .length;
  }, [habits]);

  const longestStreak = useMemo(() => {
    const getStreak = (habit: Habit) => {
      let streak = 0;
      const currentDate = new Date();

      while (true) {
        const dateString = currentDate.toISOString().split("T")[0];
        if (habit.completedDates.includes(dateString)) {
          streak++;
          currentDate.setDate(currentDate.getDate() - 1);
        } else {
          break;
        }
      }
      return streak;
    };
    return Math.max(...habits.map(getStreak), 0);
  }, [habits]);

  if (isLoading) {
    return <LinearProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Paper elevation={2} sx={{ p: 2, mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Habit Statistics
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Typography variant="body1">Total Habits: {totalHabits}</Typography>
        <Typography variant="body1">
          Completed Today: {completedToday}
        </Typography>
        <Typography variant="body1">
          Longest Streak: {longestStreak} days
        </Typography>
      </Box>
    </Paper>
  );
};

export default HabitStats;
