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
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Card,
  CardHeader,
  CardFooter,
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
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Create Exercise</CardTitle>
          <CardDescription>
            Create a new exercise to be used for templates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="hidden md:block">
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
          </div>
          <div className="md:hidden">
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="outline">Create Exercise</Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Create Exercise</DrawerTitle>
                  <Input
                    placeholder="Exercise Name"
                    value={exercise}
                    onChange={onChange}
                  />
                </DrawerHeader>
                <DrawerFooter>
                  <Button>Submit</Button>
                  <DrawerClose>
                    <Button variant="outline" onClick={onClick}>
                      Create
                    </Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
