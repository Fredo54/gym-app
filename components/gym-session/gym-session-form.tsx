"use client";

import { Pencil2Icon } from "@radix-ui/react-icons";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { DevTool } from "@hookform/devtools";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm, useFormState } from "react-hook-form";
import { Fragment } from "react/jsx-runtime";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Form,
  FormLabel,
  FormField,
  FormControl,
  FormItem,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { SwitchDemo } from "@/app/(protected)/workout/[gymTemplateId]/foo";
import { TrainingTemplate } from "@/types/types";
import { GymSessionExerciseSchema, GymSessionSchema } from "@/schemas";
import { useMemo } from "react";
import { toast } from "sonner";
import { createTrainingSession } from "@/actions/training-session";

const today = new Date();

export const GymSessionForm = ({
  trainingTemplate,
  userId,
}: {
  trainingTemplate: TrainingTemplate[];
  userId: string;
}) => {
  const defaultExercisesValues = useMemo(() => {
    // const values: Record<
    //   string,
    //   {
    //     weight: number[];
    //     reps: number[];
    //     notes: string;
    //     isFinished: boolean;
    //   }
    // > = {};
    const values: {
      exerciseId: string;
      weight: number[];
      reps: number[];
      notes: string;
      isFinished: boolean;
    }[] = [];
    // trainingTemplate.forEach((exercise) => {
    //   values[exercise.Exercise.id] = {
    //     weight: Array(exercise.sets).fill(0), // Initialize weight array with 0s based on sets
    //     reps: Array(exercise.sets).fill(0), // Initialize reps array with 0s based on sets
    //     notes: "", // Initialize notes as empty string
    //     isFinished: false, // Default isFinished to false
    //   };
    // });
    trainingTemplate.forEach((exercise) => {
      values.push({
        exerciseId: exercise.Exercise.id,
        weight: Array(exercise.sets).fill(0), // Initialize weight array with 0s based on sets
        reps: Array(exercise.sets).fill(0), // Initialize reps array with 0s based on sets
        notes: "", // Initialize notes as empty string
        isFinished: false, // Default isFinished to false
      });
    });

    return values;
  }, [trainingTemplate]);

  const form = useForm<z.infer<typeof GymSessionSchema>>({
    resolver: zodResolver(GymSessionSchema),
    defaultValues: {
      userId: userId,
      date: today,
      description: "",
      exercises: defaultExercisesValues,
      gymTemplateId: trainingTemplate[0].gymTemplateId,
    },
  });
  const { formState, setError } = form;
  const { isDirty } = formState;

  // console.log(trainingTemplate);
  const onSubmit = async (values: z.infer<typeof GymSessionSchema>) => {
    // const hasEmptyExerciseId = values.exercises.some(
    //   (exercise) => exercise.exerciseId === ""
    // );

    // if (hasEmptyExerciseId) {
    //   // Display an error message or show a validation error for the exerciseId field
    //   // You can use a form library like Formik or react-hook-form to handle form validation
    //   // Example using react-hook-form:
    //   const index = values.exercises.findIndex(
    //     (exercise) => exercise.exerciseId === ""
    //   );
    //   setError(`exercises.${index}.exerciseId`, {
    //     type: "required",
    //     message: "Exercise is required",
    //   });
    //   return;
    // }

    for (const exerciseId in values.exercises) {
      const hasEmptyReps = values.exercises[exerciseId].reps.some(
        (rep) => rep === 0
      );
      const hasEmptyWeight = values.exercises[exerciseId].weight.some(
        (weight) => weight === 0
      );
      // This does not work, perhaps use sonner to alert the user
      //  that it cannot leave as 0
      if (hasEmptyReps || hasEmptyWeight) {
        // exercises.${exercise.Exercise.id}.weight.${index}
        setError(`description`, {
          type: "required",
          message: "cannot leave as 0",
        });
        console.log("Did not submit");
        toast.error("Please fill in all fields with a value of 0");
        return;
      }
    }

    console.log("values: ", values);
    const { success, error } = await createTrainingSession(values);
    if (success) {
      toast.success(success);
    } else if (error) {
      toast.error(error);
    }

    console.log("submitted");
    console.log(values);
  };

  // if (loading) {
  //   return <p>Loading...</p>;
  // }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card>
            <CardHeader>
              <CardTitle>{trainingTemplate[0].GymTemplate.name}</CardTitle>
            </CardHeader>

            <CardContent>
              {!false &&
                trainingTemplate.map((exercise, index) => {
                  return (
                    <Accordion type="single" collapsible key={`${index}`}>
                      <AccordionItem value="item-1">
                        <div
                          key={`${exercise.Exercise.name}-${index}`}
                          className="flex flex-col gap-y-4"
                        >
                          <AccordionTrigger>
                            <FormLabel className="text-lg rounded-md p-2 ">
                              {exercise.Exercise.name}
                            </FormLabel>
                          </AccordionTrigger>
                          <AccordionContent>
                            <span className="border-b-2" />

                            <div className="grid grid-cols-4 gap-4">
                              <FormLabel>Set</FormLabel>
                              <FormLabel>Previous</FormLabel>
                              <FormLabel>lbs</FormLabel>
                              <FormLabel>Reps</FormLabel>

                              {Array(exercise.sets)
                                .fill(null)
                                .map((_, idx) => {
                                  return (
                                    <Fragment
                                      key={`${exercise.Exercise.id}-${idx}`}
                                    >
                                      <FormLabel>{idx + 1}</FormLabel>
                                      <FormLabel>{"prev weight"}</FormLabel>
                                      <FormField
                                        control={form.control}
                                        name={`exercises.${index}.weight.${idx}`}
                                        render={({ field }) => (
                                          <FormControl>
                                            <Input
                                              className="md:w-[80px]"
                                              {...field}
                                              placeholder="lbs"
                                              type="number"
                                            />
                                          </FormControl>
                                        )}
                                      />
                                      <FormField
                                        control={form.control}
                                        name={`exercises.${index}.reps.${idx}`}
                                        render={({ field }) => (
                                          <FormControl>
                                            <Input
                                              className="md:w-[80px]"
                                              {...field}
                                              placeholder="reps"
                                              type="number"
                                            />
                                          </FormControl>
                                        )}
                                      />
                                      <FormField
                                        control={form.control}
                                        name={`exercises.${index}.exerciseId`}
                                        render={({ field }) => (
                                          <FormControl>
                                            <Input
                                              className="hidden"
                                              {...field}
                                              value={exercise.Exercise.id}
                                            />
                                          </FormControl>
                                        )}
                                      />
                                    </Fragment>
                                  );
                                })}

                              <FormField
                                control={form.control}
                                name={`exercises.${index}.notes`}
                                render={({ field }) => (
                                  <FormControl>
                                    {/* <Input
                                      className="md:w-[80px]"
                                      {...field}
                                      placeholder="notes"
                                      type="number"
                                      defaultValue={5}
                                    /> */}
                                    <Dialog>
                                      <DialogTrigger asChild>
                                        <Button variant="outline">
                                          <Pencil2Icon className="h-6 w-6" />
                                        </Button>
                                      </DialogTrigger>
                                      <DialogContent className="sm:max-w-[425px]">
                                        <DialogHeader>
                                          <DialogTitle>
                                            Create Exercise
                                          </DialogTitle>
                                          {/* <Input
                                            placeholder="Exercise Name"
                                            {...field}
                                          /> */}
                                          <Textarea {...field} />
                                        </DialogHeader>
                                        <DialogFooter>
                                          <DialogClose asChild>
                                            <Button type="button">
                                              Create
                                            </Button>
                                          </DialogClose>
                                        </DialogFooter>
                                      </DialogContent>
                                    </Dialog>
                                  </FormControl>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name={`exercises.${index}.isFinished`}
                                render={({ field }) => (
                                  <FormItem className="col-span-2 col-start-3">
                                    <FormControl>
                                      <SwitchDemo
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                      />
                                    </FormControl>
                                  </FormItem>
                                )}
                              />
                            </div>
                          </AccordionContent>
                        </div>
                      </AccordionItem>
                    </Accordion>
                  );
                })}
            </CardContent>
            <CardFooter>
              <Button disabled={!isDirty} type="submit">
                Save
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
      {/* <DevTool control={form.control} /> */}
    </>
  );
};
