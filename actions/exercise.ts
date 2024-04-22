"use server";

import { db } from "@/lib/db";
import { ExerciseSchema } from "@/schemas";
import { z } from "zod";

export const createExercise = async (
  values: z.infer<typeof ExerciseSchema>
) => {
  const validatedFields = ExerciseSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }
  const { name, userId } = validatedFields.data;

  await db.exercise.create({
    data: {
      name: name,
      userId: userId,
    },
  });

  console.log(values);
  return { success: "Exercise created!" };
};

export const getExerciseAll = async (userId: string) => {
  const exercises = await db.exercise.findMany({
    where: {
      userId: userId,
    },
  });
  return exercises;
};
