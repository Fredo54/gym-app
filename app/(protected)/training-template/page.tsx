import { TrainingTemplateForm } from "@/components/training-template/training-template-form";
import { TrainingTemplateCards } from "@/components/training-template/training-template-cards";
import { currentUser } from "@/lib/auth";
import { getExerciseAll } from "@/actions/exercise";
import { Exercise } from "@prisma/client";

const TrainingTemplatePage = async () => {
  const user = await currentUser();
  const exercises: Exercise[] = await getExerciseAll(user?.id as string);

  return (
    <div className="w-full flex flex-col gap-y-4">
      <TrainingTemplateCards />
      <TrainingTemplateForm exercises={exercises} />
    </div>
  );
};

export default TrainingTemplatePage;
