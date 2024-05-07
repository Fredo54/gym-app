import { createExercise } from "@/actions/exercise";
import { CreateExerciseDialogue } from "@/components/exercise/create-exercise-dialogue";
import { ExerciseTable } from "@/components/exercise/exercise-table";
import { Exercise } from "@prisma/client";
import { toast } from "sonner";
export const ExerciseDashboard = ({
  userId,
  exercises,
}: {
  userId: string;
  exercises: Exercise[];
}) => {
  // const handleClick = async (exercise: string) => {
  //   const { success, error } = await createExercise({
  //     name: exercise,
  //     userId: user?.id as string,
  //   });
  //   console.log("success: ", success, " error: ", error);
  //   if (success) {
  //     toast.success(success);
  //     router.refresh();
  //   }
  //   if (error) {
  //     toast.error(error);
  //     console.error(error);
  //   }
  // };

  return (
    <div className="flex flex-col gap-y-4 items-center">
      <CreateExerciseDialogue exercises={exercises} />
    </div>
  );
};
