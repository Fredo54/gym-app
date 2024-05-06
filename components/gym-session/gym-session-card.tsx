"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { v4 as uuid } from "uuid";
import { Button } from "@/components/ui/button";
import {
  deleteTrainingSession,
  getTrainingSessionAll,
} from "@/actions/training-session";
import { Fragment, Suspense, useState } from "react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { formatTimeToHours } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { GymSessionDropdownMenu } from "@/components/gym-session/gym-session-dropdown-menu";
import { useQuery } from "@tanstack/react-query";
import { RotatingDotsLoader } from "../ui/rotating-dots-loader";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type GymSessionCardProps = {
  data: {
    GymTemplate: {
      GymTemplateExercise: {
        Exercise: {
          name: string;
        };
        sets: number;
        reps: number;
      }[];
    };
    GymSessionData: {
      notes: string | null;
      exercise: {
        sets: number;
        reps: number;
        name: string;
      };
      GymTemplate: {
        name: string;
      };
    }[];
    id: string;
    date: Date;
    description: string | null;
    userId: string;
    gymTemplateId: string;
    hasFinishedWorkout: boolean;
    reachedGoal: boolean;
  }[];
};

export const GymSessionCard = () => {
  const user = useCurrentUser();
  const { data, error, isFetched, isLoading } = useQuery({
    queryKey: ["data"],
    queryFn: () => getTrainingSessionAll(user?.id as string, 0, 1),
  });
  const [offset, setOffset] = useState(0);
  const [disable, setDisable] = useState(false);
  const limit = 1;
  const [gymSessionData, setGymSessionData] = useState(data || []);
  const router = useRouter();

  const onClick = async () => {
    try {
      console.log("offset: ", offset);
      const fetchedData = await getTrainingSessionAll(
        user?.id as string,
        offset + limit,
        limit
      );
      console.log("fetchedData: ", fetchedData);
      if (fetchedData !== null && fetchedData.length > 0) {
        setOffset(offset + limit);
        setGymSessionData([...gymSessionData, ...fetchedData]);
      } else {
        console.log("no more data: ", fetchedData);
        setDisable(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (gymSessionId: string) => {
    const { success, error } = await deleteTrainingSession(gymSessionId);
    if (success) {
      toast.success(success);
      setGymSessionData((gymSessionData) =>
        gymSessionData.filter((item) => item.id !== gymSessionId)
      );
    } else {
      toast.error(error);
    }
  };

  // if (isLoading) {
  //   return <>Loading...</>;
  // }
  return (
    <ScrollArea className="h-[400px]">
      <div className="flex flex-col gap-y-4 items-center">
        {gymSessionData &&
          gymSessionData.map((item) => {
            return (
              <Card
                key={`gymSessionCard-${item.id}`}
                className="md:w-1/2 w-[80vw]	 "
              >
                <CardHeader>
                  <CardTitle className="flex flex-row items-center justify-between gap-3">
                    {/*Name and date of Template*/}
                    <span>{item.GymTemplate.name}</span>
                    <span> {item.date.toDateString()}</span>
                  </CardTitle>
                  <CardDescription className="text-xs">
                    {formatTimeToHours(item.date)}
                  </CardDescription>
                  <CardDescription className="text-xs">
                    id:{item.id}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col justify-between rounded-lg border p-3 gap-3 shadow-sm overflow-auto h-[200px]">
                    <span className="flex flex-row items-center justify-between">
                      <p className="text-sm font-medium">Exercise</p>

                      <GymSessionDropdownMenu
                        gymSessionId={item.id}
                        onDelete={handleDelete}
                      />
                    </span>

                    {item.GymSessionData.map((data, idx) => {
                      const sets =
                        item.GymTemplate.GymTemplateExercise[idx].sets;
                      return (
                        <div
                          // key={`${item.id}-${data.ExerciseInstance[idx].ExerciseId.id}-${idx}`}
                          key={`${item.id}-${data.exercise.name}-${idx}`}
                          // max-w-[180px]
                          className=" text-xs flex flex-row justify-between font-mono p-1 bg-primary text-primary-foreground rounded-md"
                        >
                          <div> {`${data.exercise.name}`}</div>
                          <div>
                            {sets} x
                            {data.ExerciseInstance.map((instance, idx) => (
                              <Fragment
                                key={`${item.id}-${data.id}-${instance.ExerciseId.id}-${instance.gymSessionDataId}-${instance.setCount}`}
                              >{` ${instance.repCount} `}</Fragment>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                    <p className="text-sm font-medium">Description</p>
                    {item.description && (
                      <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-primary text-primary-foreground rounded-md">
                        {item.description}
                      </p>
                    )}
                  </div>
                </CardContent>
                {/* <CardFooter className="flex flex-row items-right justify-end">
              <Button className="flex justify-center items-center">
                <Pencil2Icon className="justify-center items-center h-4 w-4" />
              </Button>
            </CardFooter> */}
              </Card>
            );
          })}
        {/* TODO: Convert from Button to Scroll with react-interaction-observer */}
        <Button variant="secondary" disabled={disable} onClick={onClick}>
          {disable ? "No more data" : "Load More"}
        </Button>
      </div>
    </ScrollArea>
  );
};
