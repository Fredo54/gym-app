import { getExerciseAll } from "@/actions/exercise";
import { useEffect, useState } from "react";
import { useCurrentUser } from "./use-current-user";
import { ExerciseSchema } from "@/schemas";
import { z } from "zod";

export const useExerciseFetch = () => {
  const [exercises, setExercises] =
    useState<(z.infer<typeof ExerciseSchema> & { id: string })[]>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const user = useCurrentUser();

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const exercises = await getExerciseAll(user?.id as string);

        setExercises(exercises);

        setLoading(false);
      } catch (error) {
        setError("Error fetching exercises. Please try again later.");
        setLoading(false);
      }
    };

    fetchExercises();

    return () => {
      // Cleanup function
    };
  }, []);

  return { exercises, loading, error };
};
