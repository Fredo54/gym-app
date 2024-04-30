export type ReducedTrainingTemplate = {
  gymTemplateId: string;
  name: string;
  exercises: {
    name: string;
    reps: number;
    sets: number;
    id: string;
  }[];
};

export type TrainingTemplate = {
  Exercise: { name: string; id: string };
  GymTemplate: { name: string };
  gymTemplateId: string;
  sets: number;
  reps: number;
};

export type TransformedExerciseInstances = {
  [key: string]: {
    weight: number;
    setCount: number;
    repCount: number;
    gymSessionDataId: string;
    ExerciseId: {
      id: string;
    };
  }[];
};

export type TransformedGymSession = {
  GymSessionData?: {
    exercise: {
      name: string;
      id: string;
    };
    exerciseInstances: TransformedExerciseInstances[string];
    notes: string | null;
    GymTemplate: {
      name: string;
      id: string;
    };
    id: string;
  }[];
  GymTemplate: {
    name: string;
    id: string;
  };
};
