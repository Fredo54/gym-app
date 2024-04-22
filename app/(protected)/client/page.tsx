"use client";

// import { auth } from "@/auth";
// import { currentUser } from "@/lib/auth";
import { UserInfo } from "@/components/user-info";
import { useCurrentUser } from "@/hooks/use-current-user";
// import { generateMockData } from "@/actions/mock-data";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { CreateExerciseDialogue } from "@/components/exercise/create-exercise-dialogue";

const ClientPage = () => {
  // const session = await auth();
  // const user = await currentUser();
  const form = useForm();

  const onSubmit = async () => {
    // await generateMockData();
  };
  const user = useCurrentUser();

  return (
    <div className="w-full">
      <CreateExerciseDialogue />

      <UserInfo user={user} label="📱 Client Component" />
      <form
        // action={generateMockData}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Button>Generate Mock Data</Button>
      </form>
    </div>
  );
};

export default ClientPage;
