"use client";

import { GymSessionEditForm } from "./gym-session-edit-form";
import { getTrainingSessionById } from "@/actions/training-session";
import { useQuery } from "@tanstack/react-query";
import { useCurrentUser } from "@/hooks/use-current-user";

const foo = {
  date: "2024-04-23T06:51:37.940Z",
  description: "",
  hasFinishedWorkout: true,
  reachedGoal: true,
  GymSessionData: [
    {
      id: "f2cf0d39-9ebb-4864-a77d-36064cbf0257",
      notes: "",
      GymTemplate: {
        name: "Template 1",
        id: "clvc12dd90008te425uw5om7f",
      },
      exercise: {
        name: "exercise 1",
      },
    },
    {
      id: "455225b0-f90e-4c19-bcc5-1516e37f6843",
      notes: "",
      GymTemplate: {
        name: "Template 1",
        id: "clvc12dd90008te425uw5om7f",
      },
      exercise: {
        name: "exercise 2",
      },
    },
  ],
  ExerciseInstance: [
    {
      gymSessionDataId: "f2cf0d39-9ebb-4864-a77d-36064cbf0257",
      weight: 1,
      setCount: 0,
      repCount: 1,
      ExerciseId: {
        name: "exercise 1",
        id: "clvc11s2c0004te42vvi7kke9",
      },
    },
    {
      gymSessionDataId: "455225b0-f90e-4c19-bcc5-1516e37f6843",
      weight: 1,
      setCount: 0,
      repCount: 1,
      ExerciseId: {
        name: "exercise 2",
        id: "clvc11vin0006te42kwgp9p9s",
      },
    },
  ],
};

export const GymSessionDialogEdit = ({
  gymSessionId,
}: {
  gymSessionId: string;
}) => {
  const user = useCurrentUser();

  const { data, error, isFetched, isLoading } = useQuery({
    queryKey: ["sessionId"],
    queryFn: async () =>
      getTrainingSessionById(gymSessionId, user?.id as string).then((data) => {
        return {
          gymSessionData: data,
          id: data?.id,
          defaultExerciseValues: data?.GymSessionData.map((exercise) => {
            return {
              id: exercise.id,
              exerciseId: exercise.exercise.id,
              weight: exercise.ExerciseInstance.map(
                (exerciseInstance) => exerciseInstance.weight
              ),
              reps: exercise.ExerciseInstance.map(
                (exerciseInstance) => exerciseInstance.repCount
              ),
            };
          }),
        };
      }),
  });

  if (isLoading) {
    return <>Loading...</>;
  }

  console.log("data: ", data);

  return <GymSessionEditForm data={data} />;
};
