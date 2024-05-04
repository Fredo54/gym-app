"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogPortal,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogPortal,
} from "@/components/ui/alert-dialog";
import { GymSessionDialogEdit } from "@/components/gym-session/gym-session-dialog-edit";
import { Suspense } from "react";
import { RotatingDotsLoader } from "../ui/rotating-dots-loader";

export const GymSessionDropdownMenu = ({
  gymSessionId,
}: {
  gymSessionId: string;
}) => {
  //   const [click, setClick] = useState(false);

  //   const onClick = () => {
  //     const { exerciseInstances, loading, error } = useFetchExerciseInstances({
  //       gymSessionId,
  //     });
  //   };

  return (
    <Dialog>
      <AlertDialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="p-0 h-6 w-8">
              <DotsHorizontalIcon className="justify-center items-center h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DialogTrigger asChild>
              <DropdownMenuItem onSelect={() => console.log("edit")}>
                Edit
              </DropdownMenuItem>
            </DialogTrigger>
            <AlertDialogTrigger asChild>
              <DropdownMenuItem>Delete</DropdownMenuItem>
            </AlertDialogTrigger>
          </DropdownMenuContent>
          <DialogPortal>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit me later</DialogTitle>
                <Suspense fallback={<RotatingDotsLoader />}>
                  <DialogDescription asChild>
                    <GymSessionDialogEdit gymSessionId={gymSessionId} />
                  </DialogDescription>
                </Suspense>
              </DialogHeader>
            </DialogContent>
          </DialogPortal>
          <AlertDialogPortal>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogPortal>
        </DropdownMenu>
      </AlertDialog>
    </Dialog>
  );
};
