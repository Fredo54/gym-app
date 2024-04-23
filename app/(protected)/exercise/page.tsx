import { CreateExerciseDialogue } from "@/components/exercise/create-exercise-dialogue";
import { ExerciseTable } from "@/components/exercise/exercise-table";

const ExercisePage = () => {
  return (
    <div className="flex flex-col gap-y-2">
      <CreateExerciseDialogue />
      <ExerciseTable />
    </div>
  );
};

export default ExercisePage;
