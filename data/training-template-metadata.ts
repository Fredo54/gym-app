import { db } from "@/lib/db";

export const getTrainingTemplateMetadataById = async (id: string) => {
  try {
    const trainingTemplateMetadata = await db.gymTemplate.findUnique({
      where: {
        id: id,
      },
    });
    return trainingTemplateMetadata;
  } catch (error) {
    console.error(error);
    return null;
  }
};
