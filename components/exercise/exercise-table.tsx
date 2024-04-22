import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { currentUser } from "@/lib/auth";
import { getExerciseAll } from "@/data/exercise";

export const ExerciseTable = async () => {
  const user = await currentUser();
  const exercises = await getExerciseAll(user?.id as string);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Exercise</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {exercises?.map((exercise) => (
          <TableRow key={exercise.id}>
            <TableCell>{exercise.name}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableCaption>{exercises?.length} exercises</TableCaption>
    </Table>
  );
};
