import { db } from "@/lib/db";

export const getExerciseById = async (id: string, userId: string) => {
  try {
    const exercise = await db.exercise.findUnique({
      where: {
        id: id,
        userId: userId,
      },
    });
    return exercise;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getExerciseAll = async (userId: string) => {
  try {
    const exercises = await db.exercise.findMany({
      where: {
        userId: userId,
      },
    });
    return exercises;
  } catch (error) {
    console.error(error);
    return null;
  }
};
