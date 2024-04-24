import { useCurrentUser } from "@/hooks/use-current-user";
import { currentUser } from "@/lib/auth";
import { getTrainingSessionAll } from "@/actions/training-session";
import { GymSessionCard } from "@/components/gym-session/gym-session-card";
import { ExerciseTable } from "@/components/exercise/exercise-table";
import { CreateExerciseDialogue } from "@/components/exercise/create-exercise-dialogue";
import { GymSessionDropdownMenu } from "@/components/gym-session/gym-session-dropdown-menu";

const TrainingLogPage = async () => {
  // const user = useCurrentUser();
  const user = await currentUser();
  const data = await getTrainingSessionAll(user?.id as string, 0, 1);
  // console.log("data: ", data);

  return (
    <div className="w-full">
      <h1>Gym Session Log Page</h1>

      {/* {data} */}
      {data && <GymSessionCard data={data} />}
      <GymSessionDropdownMenu />
    </div>
  );
};

export default TrainingLogPage;
