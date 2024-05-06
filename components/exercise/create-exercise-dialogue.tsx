"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createExercise } from "@/actions/exercise";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const CreateExerciseDialogue = () => {
  const [exercise, setExercise] = useState("");
  const user = useCurrentUser();
  const router = useRouter();
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExercise(e.target.value);
  };

  const onClick = async () => {
    try {
      const { success, error } = await createExercise({
        name: exercise,
        userId: user?.id as string,
      });
      if (success) {
        console.log(success);
        router.refresh();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Exercise</CardTitle>
        <CardDescription>
          Create a new exercise to be used for templates
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Create Exercise</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] w-[80vw] rounded-lg">
            <DialogHeader>
              <DialogTitle>Create Exercise</DialogTitle>
              <Input
                placeholder="Exercise Name"
                value={exercise}
                onChange={onChange}
              />
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" onClick={onClick}>
                  Create
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};
