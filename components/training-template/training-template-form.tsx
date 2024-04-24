"use client";
import { z } from "zod";
import { GymTemplateExerciseSchema } from "@/schemas";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { TrashIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import { DevTool } from "@hookform/devtools";
import { createTrainingTemplate } from "@/actions/training-template";
import { useRouter } from "next/navigation";
import { Exercise } from "@prisma/client";
import { toast } from "sonner";

type Props = {
  exercises: Exercise[];
};

export const TrainingTemplateForm = ({ exercises }: Props) => {
  const user = useCurrentUser();
  const router = useRouter();
  const form = useForm<z.infer<typeof GymTemplateExerciseSchema>>({
    resolver: zodResolver(GymTemplateExerciseSchema),
    defaultValues: {
      name: "",
      userId: user?.id as string,
      exercises: [
        {
          orderId: 0,
          sets: 0,
          reps: 0,
        },
      ],
    },
  });
  const { setError } = form;
  const { fields, append, remove } = useFieldArray({
    name: "exercises",
    control: form.control,
  });

  const onSubmit = async (
    values: z.infer<typeof GymTemplateExerciseSchema>
  ) => {
    const hasEmptyExerciseId = values.exercises.some(
      (exercise) => exercise.exerciseId === ""
    );
    const hasNegativeNumber = values.exercises.some((exercise) => {
      return exercise.sets < 1 || exercise.reps < 1;
    });
    if (hasEmptyExerciseId) {
      const index = values.exercises.findIndex(
        (exercise) => exercise.exerciseId === ""
      );
      setError(`exercises.${index}.exerciseId`, {
        type: "required",
        message: "Exercise is required",
      });
      return;
    }
    if (hasNegativeNumber) {
      toast.error("Numbers less than 0 are not allowed");
      return;
    }

    const exercisesWithOrderId = values.exercises.map((exercise, index) => ({
      ...exercise,
      orderId: index + 1,
    }));
    // console.log("submit!");
    const valuesWithOrderId = { ...values, exercises: exercisesWithOrderId };
    const { success, error } = await createTrainingTemplate(valuesWithOrderId);
    if (success) {
      form.reset();
      toast.success("Training Template created!");
      console.log("success: ", success);
    } else {
      console.log("error: ", error);
    }
    router.refresh();
  };

  return (
    <div>
      {
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Card>
              <CardHeader>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Template Name</FormLabel>
                      <Input {...field} placeholder="Template Name" />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-y-4">
                  {fields.map((field, index) => {
                    return (
                      <Card key={index}>
                        <CardContent>
                          <div className="flex flex-row justify-center gap-x-2">
                            <div className="grow w-1/2">
                              <FormField
                                control={form.control}
                                name={`exercises.${index}.exerciseId`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Exercise</FormLabel>
                                    <div className="flex flex-row">
                                      <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                      >
                                        <FormControl>
                                          <SelectTrigger>
                                            <SelectValue placeholder="Select an Exercise" />
                                          </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                          {exercises &&
                                            exercises.map((exercise, index) => (
                                              <SelectItem
                                                key={index}
                                                value={`${exercise.id}`}
                                              >
                                                {exercise.name}
                                              </SelectItem>
                                            ))}
                                        </SelectContent>
                                      </Select>
                                    </div>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            <div className="grow-0 w-[100px]">
                              <FormField
                                control={form.control}
                                name={`exercises.${index}.sets`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Sets</FormLabel>
                                    <FormControl>
                                      <Input
                                        {...field}
                                        placeholder="sets"
                                        type="number"
                                      />
                                    </FormControl>
                                  </FormItem>
                                )}
                              />
                            </div>
                            <div className="grow-0 w-[100px]">
                              <FormField
                                control={form.control}
                                name={`exercises.${index}.reps`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Reps</FormLabel>
                                    <FormControl>
                                      <Input
                                        {...field}
                                        type="number"
                                        placeholder="reps"
                                      />
                                    </FormControl>
                                  </FormItem>
                                )}
                              />
                            </div>
                            <div className="grow-0">
                              <FormItem>
                                {/* <FormLabel>Delete</FormLabel> */}
                                <Button
                                  disabled={fields.length === 1}
                                  onClick={() => remove(index)}
                                  size={"icon"}
                                  asChild
                                  variant={"destructive"}
                                >
                                  <TrashIcon className="hover:cursor-pointer h-[20px] w-[20px]" />
                                </Button>
                              </FormItem>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex flex-row w-full gap-x-2 items-center justify-between">
                  <Button
                    type="button"
                    onClick={() =>
                      append({
                        exerciseId: "",
                        orderId: 0,
                        sets: 0,
                        reps: 0,
                      })
                    }
                  >
                    Add Exercise
                  </Button>
                  <Button type="submit">Submit</Button>
                </div>
              </CardFooter>
            </Card>
          </form>
        </Form>
      }
      {/* <DevTool control={form.control} /> */}
    </div>
  );
};
