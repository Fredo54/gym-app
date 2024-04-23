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
import { Pencil2Icon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { getTrainingSessionAll } from "@/actions/training-session";
import { useState } from "react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { formatTimeToHours } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

type TrainingSessionCardProps = {
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

export const TrainingSessionCard = ({ data }: TrainingSessionCardProps) => {
  const [gymSessionData, setGymSessionData] = useState(data);
  const user = useCurrentUser();
  const [offset, setOffset] = useState(0);
  const [disable, setDisable] = useState(false);
  const limit = 1;

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

  return (
    <ScrollArea className="h-[400px]">
      <div className="flex flex-col gap-y-4 items-center">
        {gymSessionData.map((item) => {
          return (
            <Card key={uuid()} className="md:w-1/2 w-[80vw]	 ">
              <CardHeader>
                <CardTitle className="flex flex-row items-center justify-between gap-3">
                  {/*Name and date of Template*/}
                  <span>
                    {item.GymSessionData[0] &&
                      item.GymSessionData[0].GymTemplate.name}
                  </span>
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
                    <Button className="p-0 h-6 w-8">
                      <DotsHorizontalIcon className="justify-center items-center h-4 w-4" />
                    </Button>
                  </span>
                  {item.GymSessionData?.map((data, idx) => {
                    // console.log(data);
                    return (
                      <div
                        key={`${uuid()}-${idx}`}
                        // max-w-[180px]
                        className=" text-xs flex flex-row justify-between font-mono p-1 bg-slate-100 rounded-md"
                      >
                        <div> {`${data.exercise.name}`}</div>
                        <div>
                          {data.exercise.sets}x{data.exercise.reps}
                        </div>
                      </div>
                    );
                  })}
                  <p className="text-sm font-medium">Description</p>
                  {item.description && (
                    <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
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
