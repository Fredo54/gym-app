// import { db } from "@/lib/db";
import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();
const seedUser = async () => {
  try {
    const user = await db.user.upsert({
      where: { email: "willievega22@gmail.com" },
      update: {},
      create: {
        name: "John Doe",
        email: "willievega22@gmail.com",
        //   emailVerified: true,
        password: "123456",
      },
    });

    const exercises = [
      {
        name: "Bench Press",
        userId: user?.id,
        sets: 5,
        reps: 5,
      },
      {
        name: "Squat",
        userId: user?.id,
        sets: 5,
        reps: 5,
      },
      {
        name: "Deadlift",
        userId: user?.id,
        sets: 5,
        reps: 5,
      },
    ];
    // const exercises = await db.exercise.createMany({
    //   data: [
    //     {
    //       name: "Bench Press",
    //       userId: user?.id as string,
    //     },
    //     {
    //       name: "Squat",
    //       userId: user?.id as string,
    //     },
    //     {
    //       name: "Deadlift",
    //       userId: user?.id as string,
    //     },
    //   ],
    // });
    const exerciseIds = [];
    exercises.forEach(async (exercise) => {
      exerciseIds.push(
        await db.exercise.create({
          data: {
            name: exercise.name,
            userId: user?.id,
          },
        })
      );
    });

    console.log(exercises);
    const trainingTemplateMetaData = await db.trainingTemplateMetadata.create({
      data: {
        name: "Template 1",
        userId: user?.id,
      },
    });

    const trainingTemplateIds = [];
    exerciseIds.forEach(async (exerciseId, index) => {
      console.log("inserting exerciseId: ", exerciseId.id);
      trainingTemplateIds.push(
        await db.trainingTemplate.create({
          data: {
            // trainingTemplateMetadataId: trainingTemplateMetaData.id,
            // exerciseId: exerciseId.id,
            // userId: user?.id as string,
            sets: exercises[index].sets,
            reps: exercises[index].reps,
            orderId: index,
            Exercise: {
              connect: {
                id: exerciseId.id,
              },
            },
            TrainingTemplateMetadata: {
              connect: {
                id: trainingTemplateMetaData.id,
              },
            },
            User: {
              connect: {
                id: user?.id,
              },
            },
          },
        })
      );
    });
    const trainingSession = await db.trainingSession.create({
      data: {
        date: new Date(),
        description: "My first training session",
        userId: user?.id,
      },
    });
    console.log("created trainingSession: ", trainingSession);
    const trainingDataList = [];

    exerciseIds.forEach(async (exerciseId, index) => {
      console.log("inserting exerciseId: ", exerciseId.id);
      trainingDataList.push(
        await db.trainingData.create({
          data: {
            // exerciseId: exerciseId.id,
            // trainingSessionId: trainingSession.id,
            // trainingTemplateId: trainingTemplateMetaData.id,
            // trainingTemplateMetadataId: trainingTemplateMetaData.id,
            exercise: {
              connect: {
                id: exerciseId.id,
              },
            },
            TrainingSessionId: {
              connect: {
                id: trainingSession.id,
              },
            },
            // TrainingTemplateId: {
            //   connect: {
            //     id: trainingTemplate.id,
            //   },

            TrainingTemplateMetadata: {
              connect: {
                id: trainingTemplateMetaData.id,
              },
            },
            // userId: user?.id as string
            user: {
              connect: {
                id: user?.id,
              },
            },
            sets: 5,
            reps: 5,
            weight: 200,
            notes: "Some notes about this exercise",
          },
        })
      );

      console.log(trainingDataList);
    });
  } catch (error) {
    console.error(error);
  } finally {
    await db.$disconnect();
  }
};

seedUser();

/*
Create 3 exercises
Create 1 Training Template
Create 1 Training Session
Create 3 Training Data
*/

// import { PrismaClient } from "@prisma/client";
// console.log("Seeding prisma");

// const prisma = new PrismaClient();
// // console.log(prisma.user);
// async function main() {
//   // const alice = await prisma.user.create({
//   //   where: { email: "alice@prisma.io" },
//   //   update: {},
//   //   create: {
//   //     email: "alice@prisma.io",
//   //     name: "Alice",
//   //     password: "123456",
//   //     //   posts: {
//   //     //     create: {
//   //     //       title: "Check out Prisma with Next.js",
//   //     //       content: "https://www.prisma.io/nextjs",
//   //     //       published: true,
//   //     //     },
//   //     //   },
//   //   },
//   // });
//   // if (prisma.user) {
//   //   console.log("user exists");
//   //   console.log(prisma.user);
//   // } else {
//   //   console.log("user does not exist");
//   // }
//   // const users = await prisma.exercise.findMany();
//   // console.log("users", users);

//   console.log(prisma);
//   const users = await prisma.exercise.findMany(/* your query options */);
//   // console.log("users: ", users);
//   const user = await prisma.user.create({
//     data: {
//       name: "John Doe",
//       email: "willievega22@gmail.com",
//       //   emailVerified: true,
//       password: "123456",
//     },
//   });
//   // const bob = await prisma.user.upsert({
//   //   where: { email: "bob@prisma.io" },
//   //   update: {},
//   //   create: {
//   //     email: "bob@prisma.io",
//   //     name: "Bob",
//   //     password: "123456",
//   //     //   posts: {
//   //     //     create: [
//   //     //       {
//   //     //         title: "Follow Prisma on Twitter",
//   //     //         content: "https://twitter.com/prisma",
//   //     //         published: true,
//   //     //       },
//   //     //       {
//   //     //         title: "Follow Nexus on Twitter",
//   //     //         content: "https://twitter.com/nexusgql",
//   //     //         published: true,
//   //     //       },
//   //     //     ],
//   //     //   },
//   //   },
//   // });
//   // console.log({ user });
//   // console.log({ alice, bob });
// }
// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });
