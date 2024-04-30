import { getTrainingSessionById } from "@/actions/training-session";
import { currentUser } from "@/lib/auth";

export const ServerComponent = async ({
  gymSessionId,
  children,
}: {
  gymSessionId: string;
  children: React.ReactNode;
}) => {
  const user = await currentUser();

  const data = await getTrainingSessionById(gymSessionId, user?.id as string);
  console.log("data: ", data);

  return <>{children}</>;
};
