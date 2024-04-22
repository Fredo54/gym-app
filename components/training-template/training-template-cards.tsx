import { getTrainingTemplateAllGrouped } from "@/actions/training-template";
import { currentUser } from "@/lib/auth";
import { TrainingTemplateCard } from "@/components/training-template/training-template-card";

export const TrainingTemplateCards = async () => {
  const user = await currentUser();
  const data = await getTrainingTemplateAllGrouped(user?.id as string);
  // add loading.ts or add react suspense to deal with async loading
  return (
    <div className="md:w-50vw flex flex-row flex-wrap gap-4 justify-center">
      {data &&
        data.map((trainingTemplate) => (
          <TrainingTemplateCard trainingTemplateData={trainingTemplate} />
        ))}
    </div>
  );
};
