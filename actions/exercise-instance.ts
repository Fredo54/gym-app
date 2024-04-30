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
      select: {
        ExerciseId: {
          select: {
            name: true,
            id: true,
          },
        },
        weight: true,
        setCount: true,
        repCount: true,
        id: true,
        GymSessionDataId: {
          select: {
            exercise: {
              select: {
                name: true,
              },
            },
            notes: true,
          },
        },
      },
    });
    console.log("ExerciseInstances: ", exerciseInstances);
    return exerciseInstances;
  } catch (error) {
    console.error(error);
    return null;
  }
};
