import { useCurrentUser } from "@/hooks/use-current-user";
import { currentUser } from "@/lib/auth";
import { getTrainingSessionAll } from "@/data/training-session";
import { TrainingSessionCard } from "@/components/gym-session/training-session-card";
import { ExerciseTable } from "@/components/exercise/exercise-table";
import { CreateExerciseDialogue } from "@/components/exercise/create-exercise-dialogue";
const TrainingLogPage = async () => {
  // const user = useCurrentUser();
  const user = await currentUser();
  const data = await getTrainingSessionAll(user?.id as string, 0, 1);
  // console.log("data: ", data);

  return (
    <div className="w-full">
      <h1>Training Log Page</h1>

      {/* {data} */}
      {data && <TrainingSessionCard data={data} />}
      <ExerciseTable />
    </div>
  );
};

export default TrainingLogPage;
