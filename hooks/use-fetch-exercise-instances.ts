import { useEffect, useState } from "react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { getExerciseInstancesByGymSessionId } from "@/actions/exercise-instance";
import { ExerciseInstance } from "@prisma/client";

export const useFetchExerciseInstances = ({
  gymSessionId,
}: {
  gymSessionId: string;
}) => {
  const [loading, setLoading] = useState(true);
  const [exerciseInstances, setExerciseInstances] = useState<
    ExerciseInstance[]
  >([]);
  const [error, setError] = useState("");
  const user = useCurrentUser();

  useEffect(() => {
    const fetchExerciseInstances = async () => {
      try {
        const exerciseInstances = await getExerciseInstancesByGymSessionId(
          gymSessionId,
          user?.id as string
        );
        console.log("exerciseInstances: ", exerciseInstances);
        if (exerciseInstances) {
          setExerciseInstances(exerciseInstances);
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
        setError("Error fetching exercise instances. Please try again later.");
        setLoading(false);
      }
    };

    fetchExerciseInstances();
  }, []);

  return { exerciseInstances, loading, error };
};
