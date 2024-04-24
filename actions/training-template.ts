"use server";
import { db } from "@/lib/db";

import { GymTemplateExerciseSchema } from "@/schemas";
import { z } from "zod";
import { TrainingTemplate, ReducedTrainingTemplate } from "@/types/types";

export const createTrainingTemplate = async (
  values: z.infer<typeof GymTemplateExerciseSchema>
) => {
  // Create Training Template Metadata
  // Grab Id of Training Template Metadata
  // Create training templates
  const validatedFields = GymTemplateExerciseSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }
  const { name, userId, exercises } = validatedFields.data;

  const trainingTemplateId = await db.gymTemplate.create({
    data: {
      name: name,
      userId: userId,
    },
  });

  await db.gymTemplateExercise.createMany({
    data: exercises.map((exercise) => ({
      gymTemplateId: trainingTemplateId.id,
      exerciseId: exercise.exerciseId,
      userId: userId,
      sets: exercise.sets,
      reps: exercise.reps,
      orderId: exercise.orderId,
    })),
  });

  return { success: "Training Template created!" };
};

/*
WE WANT
const trainingTemplates: {
    name: string;
    userId: string;
    exercises: {
        exerciseId: string;
        orderId: number;
        sets: number;
        reps: number;
    }[];
}[]

we have right now
const trainingTemplates: {
    id: string;
    trainingTemplateMetadataId: string;
    exerciseId: string;
    userId: string;
    orderId: number;
    sets: number;
    reps: number;
}[]
*/

export const getTrainingTemplateAll = async (
  userId: string,
  limit: number = 10,
  offset: number = 0
) => {
  const trainingTemplates = await db.gymTemplateExercise.findMany({
    where: {
      userId: userId,
    },
    select: {
      gymTemplateId: true,
      GymTemplate: {
        select: {
          name: true,
        },
      },
      sets: true,
      reps: true,
      Exercise: {
        select: {
          name: true,
        },
      },
    },
  });

  return trainingTemplates;
};

export const getTrainingTemplateAllGrouped = async (userId: string) => {
  const trainingTemplates = await db.gymTemplateExercise.findMany({
    where: {
      userId: userId,
    },
    select: {
      gymTemplateId: true,
      GymTemplate: {
        select: {
          name: true,
        },
      },
      sets: true,
      reps: true,
      Exercise: {
        select: {
          name: true,
          id: true,
        },
      },
    },
  });

  const reducedTrainingTemplates: ReducedTrainingTemplate[] =
    trainingTemplates.reduce(
      (acc: ReducedTrainingTemplate[], curr: TrainingTemplate) => {
        console.log("acc: ", acc);
        const existingTemplate = acc.find(
          (item: { gymTemplateId: string }) =>
            item.gymTemplateId === curr.gymTemplateId
        );

        if (existingTemplate) {
          existingTemplate.exercises.push({
            name: curr.Exercise.name,
            reps: curr.reps,
            sets: curr.sets,
            id: curr.Exercise.id,
          });
        } else {
          acc.push({
            gymTemplateId: curr.gymTemplateId,
            name: curr.GymTemplate.name,
            exercises: [
              {
                name: curr.Exercise.name,
                reps: curr.reps,
                sets: curr.sets,
                id: curr.Exercise.id,
              },
            ],
          });
        }

        return acc;
      },
      []
    );

  return reducedTrainingTemplates;
};

export const getGymTemplateByGymTemplateId = async (gymTemplateId: string) => {
  if (!gymTemplateId) {
    return [];
  }
  const gymTemplate = await db.gymTemplateExercise.findMany({
    where: {
      gymTemplateId: gymTemplateId,
    },
    select: {
      gymTemplateId: true,
      sets: true,
      reps: true,
      GymTemplate: {
        select: {
          name: true,
        },
      },
      Exercise: {
        select: {
          name: true,
          id: true,
        },
      },
    },
  });
  return gymTemplate;
};
