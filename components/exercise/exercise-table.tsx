import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { currentUser } from "@/lib/auth";
import { getExerciseAll } from "@/data/exercise";

export const ExerciseTable = async () => {
  const user = await currentUser();
  // TODO: Add Pagination here for the exercise table
  const exercises = await getExerciseAll(user?.id as string);

  return (
    <ScrollArea className="h-40 md:w-[400px]">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Exercise</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {exercises?.map((exercise) => (
            <TableRow key={exercise.id}>
              <TableCell className="p-2">{exercise.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableCaption>{exercises?.length} exercises</TableCaption>
      </Table>
    </ScrollArea>
  );
};
