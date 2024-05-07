import { getExerciseAll } from "@/actions/exercise";
import { CreateExerciseDialogue } from "@/components/exercise/create-exercise-dialogue";
import { ExerciseTable } from "@/components/exercise/exercise-table";
import { currentUser } from "@/lib/auth";
import { ExerciseDashboard } from "@/components/exercise/exercise-dashboard";

const ExercisePage = async () => {
  const user = await currentUser();
  // TODO: Add Pagination here for the exercise table
  const exercises = await getExerciseAll(user?.id as string);
  return (
    <div>
      <ExerciseDashboard userId={user?.id as string} exercises={exercises} />
    </div>
  );
};

export default ExercisePage;
