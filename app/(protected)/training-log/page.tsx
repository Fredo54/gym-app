import { currentUser } from "@/lib/auth";
import { getTrainingSessionAll } from "@/actions/training-session";
import { GymSessionCard } from "@/components/gym-session/gym-session-card";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

const TrainingLogPage = async () => {
  // const user = useCurrentUser();
  const user = await currentUser();
  // const data = await getTrainingSessionAll(user?.id as string, 0, 1);
  // console.log("data: ", data);
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["data"],
    queryFn: () => getTrainingSessionAll(user?.id as string, 0, 1),
  });

  return (
    <div className="w-full">
      <h1>Gym Session Log Page</h1>

      <HydrationBoundary state={dehydrate(queryClient)}>
        <GymSessionCard />
      </HydrationBoundary>
    </div>
  );
};

export default TrainingLogPage;
