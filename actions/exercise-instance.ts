"use server";

import { db } from "@/lib/db";

export const getExerciseInstancesByGymSessionId = async (
  gymSessionId: string,
  userId: string
) => {
  try {
    const exerciseInstances = await db.exerciseInstance.findMany({
      where: {
        gymSessionId: gymSessionId,
        userId: userId,
      },
    });
    console.log("ExerciseInstances: ", exerciseInstances);
    return exerciseInstances;
  } catch (error) {
    console.error(error);
    return null;
  }
};
