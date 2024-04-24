"use client";
import { useFetchExerciseInstances } from "@/hooks/use-fetch-exercise-instances";

export const GymSessionDialogEdit = ({
  gymSessionId,
}: {
  gymSessionId: string;
}) => {
  const { exerciseInstances, loading, error } = useFetchExerciseInstances({
    gymSessionId,
  });
  console.log("loading: ", loading);

  return (
    <>{loading ? <>Loading...</> : <>{JSON.stringify(exerciseInstances)}</>}</>
  );
};
