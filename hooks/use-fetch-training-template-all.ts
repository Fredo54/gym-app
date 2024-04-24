"use client";

import { getTrainingTemplateAllGrouped } from "@/actions/training-template";
import { useEffect, useState } from "react";
import { useCurrentUser } from "./use-current-user";
import { ReducedTrainingTemplate } from "@/types/types";

export const useFetchTrainingTemplateAll = () => {
  const user = useCurrentUser();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [trainingTemplates, setTrainingTemplates] = useState<
    ReducedTrainingTemplate[]
  >([]);

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
