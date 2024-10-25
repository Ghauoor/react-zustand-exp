import { Box, Container, Typography } from "@mui/material";
import AddHabitForm from "./components/add-habit-form";
import HabitList from "./components/habit-list";
import HabitStats from "./components/habit-stats";

function App() {
  return (
    <Container>
      <Box>
        <Typography variant="h2" component="h1" gutterBottom align="center">
          Habit Tracker
        </Typography>
        {/* FORM */}
        <AddHabitForm />
        {/* LIST OF HABITS */}
        <HabitList />
        {/* Stats */}
        <HabitStats />
      </Box>
    </Container>
  );
}

export default App;
