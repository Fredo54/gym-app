import { UserRole } from "@prisma/client";
import { z } from "zod";

export const GymSessionExerciseSchema = z.object({
  exerciseId: z.string(),
  weight: z.array(z.coerce.number()),
  reps: z.array(z.coerce.number()),
  notes: z.string().optional(),
  isFinished: z.boolean(),
});

export const GymSessionSchema = z.object({
  userId: z.string(),
  gymTemplateId: z.string(),
  // exercises: z.record(z.string(), GymSessionExerciseSchema),
  exercises: z.array(GymSessionExerciseSchema),
  date: z.date(),
  description: z.string().optional(),
});

export const TrainingSessionSchema = z.object({
  // Need this schema to create a training session
  // post to database
  trainingTemplateMetadataId: z.string(),
});

export const GymSessionAndDataSchema = z.object({
  trainingTemplateId: z.string(),
  trainingTemplateMetadataId: z.string(),
  date: z.date(),
  description: z.string().optional(),
  exercises: z.array(
    z.object({
      exerciseId: z.string(),
      sets: z.number(),
      reps: z.number(),
      weight: z.number(),
      notes: z.string().optional(),
    })
  ),
  userId: z.string(),
});

// {
//   "clv0971k00001j603jg569l9t": {
//       "lbs": [
//           "4",
//           "4234322",
//           "24342423"
//       ],
//       "reps": [
//           "3443",
//           "2423424",
//           "2424234234"
//       ],
//       "notes": "234234twrgdsfgdfgtre3q",
//       "finishedExercise": true
//   },
//   "cluy9uw2y0001cv170bv7ynpc": {
//       "lbs": [
//           "221343424324",
//           "22342",
//           "24234"
//       ],
//       "reps": [
//           "24324234234",
//           "242342",
//           "22423424"
//       ],
//       "notes": "adsfqwertwqf\nwtwqetqtrq245235"
//   }
// }

export const GymSessionDataSchema = z.object({
  // Need this schema to store each set of each exercise from GymSession
  // post to database
  // Think about how the data is going to be sent through react hook form
  // z.array() is probably necessary.
  // Think of the simplest way to send data with the least manipulating
  exerciseId: z.string(),
  gymSessionId: z.string(),
  gymTemplateId: z.string(),
  sets: z.number(),
  reps: z.number(),
  weight: z.number(),
  notes: z.string().optional(),
  userId: z.string(),
});

export const GymTemplateExerciseSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  userId: z.string(),
  exercises: z.array(
    z.object({
      exerciseId: z.string(),
      orderId: z.number(),
      sets: z.coerce.number(),
      reps: z.coerce.number(),
    })
  ),
});

export const ExerciseSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  userId: z.string(),
});

export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }

      return true;
    },
    {
      message: "New password is required!",
      path: ["newPassword"],
    }
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false;
      }
      return true;
    },
    {
      message: "Password is required!",
      path: ["password"],
    }
  );

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
  name: z.string().min(1, {
    message: "Name is required",
  }),
});
