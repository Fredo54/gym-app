"use client";

import {
  getTrainingTemplateAll,
  getTrainingTemplateAllGrouped,
} from "@/actions/training-template";
import { useEffect, useState } from "react";
import { GymTemplateExerciseSchema, GymSessionAndDataSchema } from "@/schemas";
import { z } from "zod";
import { useCurrentUser } from "./use-current-user";

/*
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

export const useFetchTrainingTemplateAll = () => {
  const user = useCurrentUser();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [trainingTemplates, setTrainingTemplates] = useState<z.infer<any>[]>(
    []
  );

  useEffect(() => {
    const fetchTrainingTemplates = async () => {
      try {
        const trainingTemplates = await getTrainingTemplateAllGrouped(
          user?.id as string
        );
        setTrainingTemplates(trainingTemplates);
        setLoading(false);
      } catch (error) {
        setError("Error fetching training templates. Please try again later.");
        setLoading(false);
      }
    };
    fetchTrainingTemplates();
    return () => {
      // Cleanup function
    };
  }, []);

  return { trainingTemplates, loading, error };
};
