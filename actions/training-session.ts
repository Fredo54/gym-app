"use server";
import { db } from "@/lib/db";
import { z } from "zod";
import { GymSessionSchema } from "@/schemas";
import { v4 as uuid } from "uuid";

// Def WRONG !!
// We want to create multiple rows for each set
export const createTrainingSession = async (
  values: z.infer<typeof GymSessionSchema>
) => {
  const validatedFields = GymSessionSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  // console.log(validatedFields);
  const { exercises, date, description, gymTemplateId, userId } =
    validatedFields.data;

  // console.log(exercises);
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
  /*
  [
    {
      exerciseId: "",
      gymSessionId: "",
      gymTemplateId: "",
      notes: "",
      userId: "",
      isFinished: true
    },

  ]
  */
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
          // gymSessionDataId: gymSessionDataPayload[i].id,
        });
      }
    }

    console.log("exerciseInstancesPayload: ", exerciseInstancesPayload);
    // const gymSessionDataIds: {
    //   id: string;
    //   // exerciseId: string;
    //   // gymSessionId: string;
    //   // gymTemplateId: string;
    //   // notes: string | null;
    //   // userId: string;
    //   // isFinished: boolean;
    // }[] = [];
    const gymSessionDataIds: string[] = [];
    // gymSessionDataPayload.map(async (gymSessionData, index) => {
    //   const gymSessionDataId = await db.gymSessionData.create({
    //     data: gymSessionData,
    //   });
    await db.gymSessionData.createMany({
      data: gymSessionDataPayload,
    });

    // console.log("data: ", {
    //   gymSessionDataId: gymSessionDataId.id,
    //   ...exerciseInstancesPayload[index],
    // });
    await db.exerciseInstance.createMany({
      data: exerciseInstancesPayload,
    });

    // console.log("gymSessionDataPayload: ", gymSessionDataPayload);
    // console.log("exerciseInstancesPayload: ", exerciseInstancesPayload);
    // console.log("gymSessionDataIds: ", gymSessionDataIds);

    // gymSessionDataIds.map(async (gymSessionDataId, index) => {
    //   await db.exerciseInstance.createMany({
    //     data: {
    //       gymSessionDataId: gymSessionDataId,
    //       ...exerciseInstancesPayload[index],
    //     },
    //   });
    // });
  } catch (error) {
    return { error: "Something went wrong!" };
  }

  /*
  [
    {
      exerciseInstanceId: "",
      weight: 0,
      setCount: 0,
      repCount: 0,
      gymSessionId: "",
      gymTemplateId: "",
      userId: "",
      exerciseId: "",
      gymSessionDataId: "",
    }
  ]
  */

  return { success: "Training Session created!" };
};

export const getGymSessions = async () => {
  const gymSessions = await db.gymSession.findMany();
  return gymSessions;
};

export const getTrainingSessionAll = async (
  userId: string,
  offset: number = 0,
  limit: number = 10
) => {
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

    // const gymSessionData = await db.gymSessionData.findMany({
    //   where:
    // })

    const res = [];
    for (const gymSession of gymSessions) {
      console.log("bruh");
      const foo = gymSession.GymTemplate.GymTemplateExercise;

      res.push({
        ...gymSession,
        GymSessionData: gymSession.GymSessionData.map(
          (gymSessionData, index) => {
            return {
              ...gymSessionData,
              exercise: {
                name: foo[index].Exercise.name,
                sets: foo[index].sets,
                reps: foo[index].reps,
              },
            };
          }
        ),
      });
    }

    return res;
  } catch (error) {
    console.error(error);
    return null;
  }
};
/*
  1 Created Training Template
  TrainingSession Selected, insert a date and give it a name for the session
  Already has predefined exercises within the template
  User Adds their weights and sets and reps for each exercise in the template (Must be an array)
  After that user submits the form and posts to database

  Database POST:
  Create TrainingSession and grab TrainingSessionId
  Use TrainingSessionId to populate TrainingData with createMany({})
 */
