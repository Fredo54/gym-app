"use server";

import { db } from "@/lib/db";

export const deleteGymSessionDataByGymSessionId = async (
  gymSessionId: string
) => {
  try {
    const deleteGymSessionData = await db.gymSessionData.deleteMany({
      where: {
        gymSessionId: gymSessionId,
      },
    });
  } catch (error) {}
};
