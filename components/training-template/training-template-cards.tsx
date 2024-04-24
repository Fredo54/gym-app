import { getTrainingTemplateAllGrouped } from "@/actions/training-template";
import { currentUser } from "@/lib/auth";
import { TrainingTemplateCard } from "@/components/training-template/training-template-card";
import { ScrollArea } from "@/components/ui/scroll-area";

const foo = "md:w-50vw flex flex-row flex-wrap gap-4 justify-center";
const bar = "md:w-50vw gap-4 p-2 grid md:grid-cols-2 grid-cols-1";

export const TrainingTemplateCards = async () => {
  const user = await currentUser();
  const data = await getTrainingTemplateAllGrouped(user?.id as string);
  // add loading.ts or add react suspense to deal with async loading
  return (
    <ScrollArea className="h-[400px]">
      <div className="md:w-50vw gap-4 p-2 grid md:grid-cols-2 grid-cols-1 m-4">
        {data &&
          data.map((trainingTemplate) => (
            <TrainingTemplateCard trainingTemplateData={trainingTemplate} />
          ))}
      </div>
    </ScrollArea>
  );
};
