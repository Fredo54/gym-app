"use server";
import { db } from "@/lib/db";
import { z } from "zod";
import { GymSessionSchema } from "@/schemas";
import { v4 as uuid } from "uuid";

export const createTrainingSession = async (
  values: z.infer<typeof GymSessionSchema>
) => {
  const validatedFields = GymSessionSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { exercises, date, description, gymTemplateId, userId } =
    validatedFields.data;

  const gymSessionDataPayload = [];

  const exerciseInstancesPayload: {
    weight: number;
    setCount: number;
    repCount: number;
    gymSessionId: string;
    gymTemplateId: string;
    userId: string;
    exerciseId: string;
    gymSessionDataId: string;
  }[] = [];

  try {
    const gymSession = await db.gymSession.create({
      data: {
        gymTemplateId: gymTemplateId,
        userId: userId,
        date: date,
        description: description,
        hasFinishedWorkout: true,
        reachedGoal: true,
      },
    });

    for (const exercise of exercises) {
      gymSessionDataPayload.push({
        id: uuid(),
        exerciseId: exercise.exerciseId,
        gymSessionId: gymSession.id,
        gymTemplateId: gymTemplateId,
        notes: exercise.notes,
        userId: userId,
        isFinished: exercise.isFinished,
      });
      for (let i = 0; i < exercise.reps.length; i++) {
        exerciseInstancesPayload.push({
          gymSessionDataId: gymSessionDataPayload.at(-1)?.id as string,
          weight: exercise.weight[i],
          setCount: i,
          repCount: exercise.reps[i],
          gymSessionId: gymSession.id,
          gymTemplateId: gymTemplateId,
          userId: userId,
          exerciseId: exercise.exerciseId,
        });
      }
    }

    await db.gymSessionData.createMany({
      data: gymSessionDataPayload,
    });

    await db.exerciseInstance.createMany({
      data: exerciseInstancesPayload,
    });
  } catch (error) {
    return { error: "Something went wrong!" };
  }
  return { success: "Training Session created!" };
};

export const getTrainingSessionAll = async (
  userId: string,
  offset: number = 0,
  limit: number = 10
) => {
  // console.log("offset: ", offset, " limit: ", limit);
  try {
    const gymSessions = await db.gymSession.findMany({
      skip: offset,
      take: limit,
      orderBy: {
        date: "desc",
      },
      where: {
        userId: userId,
      },
      include: {
        GymSessionData: {
          select: {
            notes: true,
            GymTemplate: {
              select: {
                name: true,
              },
            },
            exercise: {
              select: {
                name: true,
              },
            },
          },
        },
        GymTemplate: {
          select: {
            GymTemplateExercise: {
              select: {
                sets: true,
                reps: true,
                Exercise: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    const formattedGymSessions = [];
    for (const gymSession of gymSessions) {
      const gymTemplateExercises = gymSession.GymTemplate.GymTemplateExercise;

      formattedGymSessions.push({
        ...gymSession,
        GymSessionData: gymSession.GymSessionData.map(
          (gymSessionData, index) => {
            return {
              ...gymSessionData,
              exercise: {
                name: gymTemplateExercises[index].Exercise.name,
                sets: gymTemplateExercises[index].sets,
                reps: gymTemplateExercises[index].reps,
              },
            };
          }
        ),
      });
    }

    return formattedGymSessions;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Not used anywhere
export const getTrainingSessionById = async (id: string, userId: string) => {
  try {
    const gymSession = await db.gymSession.findUnique({
      where: {
        id: id,
        userId: userId,
      },
    });
    return gymSession;
  } catch (error) {
    console.error(error);
    return null;
  }
};
