import { db } from "@/lib/db";

export const getTrainingSessionById = async (id: string, userId: string) => {
  try {
    const gymSession = await db.gymSession.findUnique({
      where: {
        id: id,
        userId: userId,
      },
    });
    return gymSession;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getTrainingSessionAll = async (
  userId: string,
  offset: number = 0,
  limit: number = 10
) => {
  try {
    const gymSessions = await db.gymSession.findMany({
      skip: offset,
      take: limit,
      orderBy: {
        date: "desc",
      },
      where: {
        userId: userId,
      },
      include: {
        GymSessionData: {
          select: {
            notes: true,
            GymTemplate: {
              select: {
                name: true,
              },
            },
            exercise: {
              select: {
                name: true,
              },
            },
          },
        },
        GymTemplate: {
          select: {
            GymTemplateExercise: {
              select: {
                sets: true,
                reps: true,
                Exercise: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    // const gymSessionData = await db.gymSessionData.findMany({
    //   where:
    // })

    const res = [];
    for (const gymSession of gymSessions) {
      console.log("bruh");
      const foo = gymSession.GymTemplate.GymTemplateExercise;

      res.push({
        ...gymSession,
        GymSessionData: gymSession.GymSessionData.map(
          (gymSessionData, index) => {
            return {
              ...gymSessionData,
              exercise: {
                name: foo[index].Exercise.name,
                sets: foo[index].sets,
                reps: foo[index].reps,
              },
            };
          }
        ),
      });
    }

    return res;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getTrainingData = async (gymSessionId: string, userId: string) => {
  try {
    const trainingData = await db.gymSessionData.findMany({
      where: {
        gymSessionId: gymSessionId,
        userId: userId,
      },
    });
    return trainingData;
  } catch {
    return null;
  }
};
