"use client";

import { getGymTemplateByGymTemplateId } from "@/actions/training-template";
import { useEffect, useState } from "react";
import { useCurrentUser } from "./use-current-user";
import { TrainingTemplate } from "@/types/types";

export const useFetchTrainingTemplateById = ({ id }: { id: string }) => {
  const user = useCurrentUser();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [trainingTemplate, setTrainingTemplate] = useState<TrainingTemplate[]>(
    []
  );

  useEffect(() => {
    const fetchTrainingTemplate = async () => {
      try {
        const trainingTemplate = await getGymTemplateByGymTemplateId(id);
        setTrainingTemplate(trainingTemplate);
        setLoading(false);
      } catch (error) {
        setError("Error fetching training template. Please try again later.");
        setLoading(false);
      }
    };
    fetchTrainingTemplate();

    return () => {
      // Cleanup function
    };
  }, [id]);

  return { trainingTemplate, loading, error };
};
