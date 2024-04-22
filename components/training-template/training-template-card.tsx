"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TrashIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import { DevTool } from "@hookform/devtools";
import { useExerciseFetch } from "@/hooks/use-exercise-fetch";
import { createTrainingTemplate } from "@/actions/training-template";
import { ReducedTrainingTemplate } from "@/types/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

export const TrainingTemplateCard = ({
  trainingTemplateData,
}: {
  trainingTemplateData: ReducedTrainingTemplate;
}) => {
  const router = useRouter();
  const user = useCurrentUser();

  return (
    <Dialog>
      <Card className="flex flex-col gap-y-2 h-full md:w-50vw">
        <CardHeader>
          <span className="text-xl">{trainingTemplateData.name}</span>
        </CardHeader>
        <span className="border-t-2" />

        <CardContent className="flex items-center flex-col ">
          <div className="text-sm h-[50px] text-wrap overflow-hidden text-left text-slate-500">
            <p>Chest day template with arms</p>
          </div>
        </CardContent>
        <span className="border-t-2" />
        <CardFooter className="flex flex-col">
          <DialogTrigger asChild>
            <Button>Select</Button>
          </DialogTrigger>
        </CardFooter>
        <DialogContent className=" rounded-lg max-w-[300px]">
          <DialogHeader>
            <DialogTitle>{trainingTemplateData.name}</DialogTitle>
          </DialogHeader>
          <DialogDescription className="text-sm">
            Created At: Datetime
          </DialogDescription>
          <div className="grid gap-4 py-4">
            <div className="flex flex-row justify-between items-center">
              <div>Sets x Reps</div>
              <div>Exercise</div>
            </div>
            <div className="text-sm text-wrap text-left">
              {trainingTemplateData &&
                trainingTemplateData.exercises.map((exercise) => {
                  return (
                    <div
                      key={`${trainingTemplateData.gymTemplateId}-${exercise.id}`}
                      className="flex flex-row items-center justify-between text-sm "
                    >
                      <div>
                        {exercise.reps} x {exercise.sets}
                      </div>
                      <div>{exercise.name}</div>
                    </div>
                  );
                })}
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              onClick={() =>
                router.push(`workout/${trainingTemplateData.gymTemplateId}`)
              }
            >
              Start
            </Button>
          </DialogFooter>
        </DialogContent>
      </Card>
    </Dialog>
  );
};
