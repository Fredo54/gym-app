"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getExerciseAll } from "@/data/exercise";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useState, useEffect } from "react";

export const ExerciseSelect = () => {
  const user = useCurrentUser();
  const [exercises, setExercises] = useState<any>([]);

  useEffect(() => {
    const fetchExercises = async () => {
      const exercises = await getExerciseAll(user?.id as string);
      setExercises(exercises);
    };
    fetchExercises();
  }, []);

  return <></>;
};
