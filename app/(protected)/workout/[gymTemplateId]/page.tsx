import { GymSessionForm } from "@/components/gym-session/gym-session-form";
import { getGymTemplateByGymTemplateId } from "@/actions/training-template";
import { currentUser } from "@/lib/auth";

const templatePage = async ({
  params,
}: {
  params: { gymTemplateId: string };
}) => {
  const { gymTemplateId } = params;
  const user = await currentUser();
  const trainingTemplate = await getGymTemplateByGymTemplateId(gymTemplateId);
  /*
  Add a date field
  Add each exercise and include the previous weight done for that exercise
  Add an option for whether it was skipped or not
  Add notes field for each exercise
  */

  return (
    <div className="w-full">
      {trainingTemplate && (
        <GymSessionForm
          trainingTemplate={trainingTemplate}
          userId={user?.id as string}
        />
      )}
    </div>
  );
};

export default templatePage;

// {
//   Date: 04/18/24,
//   Description: “Optional”,
//   exerciseA: {
//     Reps: [8,8,6],
//     Sets: [1,2,3], // Value will be generated
//     Weight: [200, 200, 200],
//     Notes: “Blah blah” // Add notes
//     finishedExercise: true, // Add switch for if exercise is finished
//     }
//   }
