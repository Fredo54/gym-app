"use client";

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
import { Exercise } from "@prisma/client";
import { useState } from "react";

export const ExerciseTable = ({
  userId,
  exercises,
}: {
  userId: string;
  exercises: Exercise[];
}) => {
  // const user = await currentUser();
  // TODO: Add Pagination here for the exercise table
  // const exercises = await getExerciseAll(user?.id as string);

  return (
    <div className="w-full">
      <h1>Your Exercise Table</h1>
      <ScrollArea className="h-max-[500px]">
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
    </div>
  );
};
