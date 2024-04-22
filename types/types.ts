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

export type Exercise = {
  id: string;
  name: string;
  userId: string;
};
