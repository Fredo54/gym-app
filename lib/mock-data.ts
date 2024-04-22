// import { db } from "@/lib/db";
// import { getUserByEmail } from "@/data/user";

// export const createUser = async () => {
//   try {
//     let user = await getUserByEmail("willievega22@gmail.com");
//     if (!user) {
//       user = await db.user.create({
//         data: {
//           name: "John Doe",
//           email: "willievega22@gmail.com",
//           //   emailVerified: true,
//           password: "123456",
//         },
//       });
//     }
//     const exercises = [
//       {
//         name: "Bench Press",
//         userId: user?.id as string,
//         sets: 5,
//         reps: 5,
//       },
//       {
//         name: "Squat",
//         userId: user?.id as string,
//         sets: 5,
//         reps: 5,
//       },
//       {
//         name: "Deadlift",
//         userId: user?.id as string,
//         sets: 5,
//         reps: 5,
//       },
//     ];
//     // const exercises = await db.exercise.createMany({
//     //   data: [
//     //     {
//     //       name: "Bench Press",
//     //       userId: user?.id as string,
//     //     },
//     //     {
//     //       name: "Squat",
//     //       userId: user?.id as string,
//     //     },
//     //     {
//     //       name: "Deadlift",
//     //       userId: user?.id as string,
//     //     },
//     //   ],
//     // });
//     const exerciseIds: { id: number }[] = [];
//     exercises.forEach(async (exercise) => {
//       exerciseIds.push(
//         await db.exercise.create({
//           data: {
//             name: exercise.name,
//             userId: user?.id as string,
//           },
//         })
//       );
//     });

//     console.log(exercises);
//     const trainingTemplateMetaData = await db.trainingTemplateMetadata.create({
//       data: {
//         name: "Template 1",
//         userId: user?.id as string,
//       },
//     });

//     const trainingTemplateIds = [];
//     exerciseIds.forEach(async (exerciseId, index) => {
//       console.log("inserting exerciseId: ", exerciseId.id);
//       trainingTemplateIds.push(
//         await db.trainingTemplate.create({
//           data: {
//             // trainingTemplateMetadataId: trainingTemplateMetaData.id,
//             // exerciseId: exerciseId.id,
//             // userId: user?.id as string,
//             sets: exercises[index].sets,
//             reps: exercises[index].reps,
//             orderId: index,
//             Exercise: {
//               connect: {
//                 id: exerciseId.id,
//               },
//             },
//             TrainingTemplateMetadata: {
//               connect: {
//                 id: trainingTemplateMetaData.id,
//               },
//             },
//             User: {
//               connect: {
//                 id: user?.id as string,
//               },
//             },
//           },
//         })
//       );
//     });
//     const trainingSession = await db.trainingSession.create({
//       data: {
//         date: new Date(),
//         description: "My first training session",
//         userId: user?.id as string,
//       },
//     });
//     console.log("created trainingSession: ", trainingSession);
//     const trainingDataList: {
//       id: number;
//       exerciseId: number;
//       trainingSessionId: number;
//       trainingTemplateMetadataId: number;
//       sets: number;
//       reps: number;
//       weight: number;
//       notes: string | null;
//       userId: string;
//     }[] = [];

//     exerciseIds.forEach(async (exerciseId, index) => {
//       console.log("inserting exerciseId: ", exerciseId.id);
//       trainingDataList.push(
//         await db.trainingData.create({
//           data: {
//             // exerciseId: exerciseId.id,
//             // trainingSessionId: trainingSession.id,
//             // trainingTemplateId: trainingTemplateMetaData.id,
//             // trainingTemplateMetadataId: trainingTemplateMetaData.id,
//             exercise: {
//               connect: {
//                 id: exerciseId.id,
//               },
//             },
//             TrainingSessionId: {
//               connect: {
//                 id: trainingSession.id,
//               },
//             },
//             // TrainingTemplateId: {
//             //   connect: {
//             //     id: trainingTemplate.id,
//             //   },

//             TrainingTemplateMetadata: {
//               connect: {
//                 id: trainingTemplateMetaData.id,
//               },
//             },
//             // userId: user?.id as string
//             user: {
//               connect: {
//                 id: user?.id as string,
//               },
//             },
//             sets: 5,
//             reps: 5,
//             weight: 200,
//             notes: "Some notes about this exercise",
//           },
//         })
//       );

//       console.log(trainingDataList);
//     });
//   } catch (error) {
//     console.error(error);
//   }
// };

// /*
// Create 3 exercises
// Create 1 Training Template
// Create 1 Training Session
// Create 3 Training Data
// */
