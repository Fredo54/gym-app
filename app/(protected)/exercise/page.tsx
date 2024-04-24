import { CreateExerciseDialogue } from "@/components/exercise/create-exercise-dialogue";
import { ExerciseTable } from "@/components/exercise/exercise-table";

const ExercisePage = () => {
  return (
    <div className="flex md:flex-row flex-col gap-2 w-full items-center justify-between">
      <CreateExerciseDialogue />
      <ExerciseTable />
    </div>
  );
};

export default ExercisePage;
