"use server";
import { db } from "@/lib/db";
import { z } from "zod";
import { GymSessionSchema } from "@/schemas";
import { v4 as uuid } from "uuid";
import { Foo } from "@/components/gym-session/gym-session-edit-form";

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
        ExerciseInstance: {
          orderBy: {
            setCount: "asc",
          },
          select: {
            id: true,
            gymSessionDataId: true,
            weight: true,
            setCount: true,
            repCount: true,
            ExerciseId: {
              select: {
                name: true,
                id: true,
              },
            },
          },
        },
        GymSessionData: {
          // orderBy: {
          // TODO: ADD ORDER ID FOR GYMSESSIONDATA
          // }
          select: {
            id: true,
            notes: true,
            exercise: {
              select: {
                name: true,
                id: true,
              },
            },
            ExerciseInstance: {
              orderBy: {
                setCount: "asc",
              },
              select: {
                gymSessionDataId: true,
                weight: true,
                setCount: true,
                repCount: true,
                ExerciseId: {
                  select: {
                    name: true,
                    id: true,
                  },
                },
              },
            },
          },
        },
        GymTemplate: {
          select: {
            name: true,
            id: true,
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

    // const formattedGymSessions = [];
    // for (const gymSession of gymSessions) {
    //   const gymTemplateExercises = gymSession.GymTemplate.GymTemplateExercise;

    //   formattedGymSessions.push({
    //     ...gymSession,
    //     GymSessionData: gymSession.GymSessionData.map(
    //       (gymSessionData, index) => {
    //         return {
    //           ...gymSessionData,
    //           exercise: {
    //             name: gymTemplateExercises[index].Exercise.name,
    //             sets: gymTemplateExercises[index].sets,
    //             reps: gymTemplateExercises[index].reps,
    //           },
    //         };
    //       }
    //     ),
    //   });
    // }

    return gymSessions;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Used in routes
export const getTrainingSessionById = async (id: string, userId: string) => {
  try {
    const gymSession = await db.gymSession.findUnique({
      where: {
        id: id,
        userId: userId,
      },
      select: {
        userId: true,
        id: true,
        date: true,
        description: true,
        hasFinishedWorkout: true,
        reachedGoal: true,
        GymTemplate: {
          select: {
            name: true,
            id: true,
          },
        },
        GymSessionData: {
          select: {
            id: true,
            notes: true,
            exercise: {
              select: {
                name: true,
                id: true,
              },
            },
            ExerciseInstance: {
              orderBy: {
                setCount: "asc",
              },
              select: {
                id: true,
                gymSessionDataId: true,
                weight: true,
                setCount: true,
                repCount: true,
                ExerciseId: {
                  select: {
                    name: true,
                    id: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    return gymSession;
  } catch (error) {
    console.error(error);
    return null;
  }
};

type Bar = {
  exercises: {
    id: string;
    gymSessionDataId: string;
    exerciseId: string;
    isFinished: boolean;
    weight: number[];
    reps: number[];
    notes?: string | undefined;
  }[];
  date: Date;
  userId: string;
  gymTemplateId: string;
  description?: string | undefined;
};

export const updateTrainingSession = async (
  values: Foo,
  gymSessionId: string
) => {
  try {
    // const validatedFields = GymSessionSchema.safeParse(values);
    const validatedFields = { data: values };
    // if (!validatedFields.success) {
    //   return { error: "Invalid fields!" };
    // }

    // const { exercises, date, description, gymTemplateId, userId } =
    //   validatedFields.data;
    // values?.gymSessionData;
    // const gymSessionDataPayload = [];

    // const exerciseInstancesPayload: {
    //   id: string;
    //   weight: number;
    //   setCount: number;
    //   repCount: number;
    //   gymSessionId: string;
    //   gymTemplateId: string;
    //   userId: string;
    //   exerciseId: string;
    //   gymSessionDataId: string;
    // }[] = [];

    const foo = await db.gymSession.update({
      where: {
        id: gymSessionId,
      },
      data: {
        id: gymSessionId,
        date: values?.gymSessionData?.date,
        description: values?.gymSessionData?.description,
        userId: values?.gymSessionData?.userId,
        gymTemplateId: values?.gymSessionData?.GymTemplate.id,
        hasFinishedWorkout: values?.gymSessionData?.hasFinishedWorkout,
        reachedGoal: values?.gymSessionData?.reachedGoal,
      },
    });

    if (!values?.gymSessionData?.GymSessionData) {
      return { error: `Something went wrong` };
    }

    const gymSessionDataUpdates = values?.gymSessionData?.GymSessionData.map(
      async (exercise) => {
        return db.gymSessionData.update({
          where: {
            id: exercise.id,
          },
          data: {
            id: exercise.id,
            exerciseId: exercise.exercise.id,
            gymSessionId: gymSessionId,
            gymTemplateId: values?.gymSessionData?.GymTemplate.id,
            notes: exercise.notes,
            isFinished: true,
          },
        });
      }
    );
    const exerciseInstancesUpdates = values?.gymSessionData?.GymSessionData.map(
      (data) => {
        return data.ExerciseInstance.map(async (exercise) => {
          return db.exerciseInstance.update({
            where: {
              id: exercise.id,
            },
            data: {
              id: exercise.id,
              weight: exercise.weight,
              setCount: exercise.setCount,
              repCount: exercise.repCount,
              gymSessionId: gymSessionId,
              gymTemplateId: values?.gymSessionData?.GymTemplate.id,
              userId: values?.gymSessionData?.userId,
              exerciseId: exercise.ExerciseId.id,
              gymSessionDataId: exercise.gymSessionDataId,
            },
          });
        });
      }
    );
    await Promise.all([...gymSessionDataUpdates, ...exerciseInstancesUpdates]);
    // await db.exerciseInstance.updateMany({
    //   where: {
    //     gymSessionId: gymSessionId,
    //   },
    //   data: exerciseInstancesPayload,
    // });
    return { success: "Training Session updated!" };
  } catch (error) {
    console.error(error);
    return { error: `Something went wrong! Error: ${error}` };
  }
};
