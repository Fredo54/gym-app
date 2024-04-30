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
import { SwitchWrapper } from "@/components/gym-session/switch-wrapper";
import { TrainingTemplate } from "@/types/types";
import { GymSessionSchema } from "@/schemas";
import { useMemo } from "react";
import { toast } from "sonner";
import {
  createTrainingSession,
  updateTrainingSession,
} from "@/actions/training-session";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useRouter } from "next/navigation";

export type Foo =
  | {
      gymSessionData: {
        GymTemplate: {
          id: string;
          name: string;
        };
        GymSessionData: {
          [x: string]: any;
          exercise: {
            id: string;
            name: string;
          };
          ExerciseInstance: {
            id: string;
            weight: number;
            setCount: number;
            repCount: number;
            gymSessionDataId: string;
            ExerciseId: {
              name: string;
              id: string;
            };
          }[];
          id: string;
          notes: string | null;
        }[];
        userId: string;
        date: Date;
        description?: string | null;
        hasFinishedWorkout: boolean;
        reachedGoal: boolean;
      } | null;
      defaultExerciseValues:
        | {
            id: string;
            exerciseId: string;
            weight: number[];
            reps: number[];
          }[]
        | undefined;
      id: string | undefined;
    }
  | undefined;

export const GymSessionEditForm = ({ data }: { data: Foo }) => {
  const user = useCurrentUser();
  const router = useRouter();
  const form = useForm<z.infer<typeof GymSessionSchema>>({
    resolver: zodResolver(GymSessionSchema),
    defaultValues: {
      userId: user?.id as string,
      gymTemplateId: data?.gymSessionData?.GymTemplate.id,
      exercises: data?.defaultExerciseValues,
      date: data?.gymSessionData?.date,
      description: data?.gymSessionData?.description || "",
    },
  });
  const { isDirty } = useFormState(form);

  const onSubmit = async (values: z.infer<typeof GymSessionSchema>) => {
    // Figure out either how to update or delete and create again!!
    // data?.gymSessionData?.GymSessionData[0].ExerciseInstance[0].id;
    // const formattedValues = {
    //   ...values,
    //   exercises: values.exercises.map((exercise, index) => {
    //     return {
    //       ...exercise,
    //       id: data?.defaultExerciseValues?.[index]?.id || "",
    //       gymSessionDataId:
    //         data?.gymSessionData?.GymSessionData[index].id || "",
    //       exerciseInstanceId:
    //     };
    //   }),
    // };
    // console.log("hello");
    // console.log(values);
    const baz = {
      ...data,
      gymSessionData: {
        ...data?.gymSessionData,
        GymSessionData:
          data?.gymSessionData?.GymSessionData.map((item, idx) => {
            return {
              ...item,
              ExerciseInstance: item.ExerciseInstance.map((instance, index) => {
                return {
                  ...instance,
                  repCount: values.exercises[idx].reps[index],
                  weight: values.exercises[idx].weight[index],
                };
              }),
            };
          }) || [],
      },
    };
    console.log("baz: ", baz);
    // console.log("formattedValues: ", formattedValues);

    const { success, error } = await updateTrainingSession(
      baz as Foo,
      data?.id as string
    );
    console.log("updated Data: ", baz);
    if (success) {
      toast.success(success);
    } else if (error) {
      toast.error(error);
    }
    router.refresh();
  };

  return (
    <>
      {data?.gymSessionData && (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <Card>
                <CardHeader>
                  <CardTitle>{data.gymSessionData.GymTemplate.name}</CardTitle>
                </CardHeader>

                <CardContent>
                  {data.gymSessionData.GymSessionData &&
                    data.gymSessionData.GymSessionData.map(
                      (exercise, index) => {
                        return (
                          <Accordion type="single" collapsible key={`${index}`}>
                            <AccordionItem value="item-1">
                              <div
                                key={`${exercise.exercise.name}-${index}`}
                                className="flex flex-col gap-y-4"
                              >
                                <AccordionTrigger>
                                  <FormLabel className="text-lg rounded-md p-2 ">
                                    {exercise.exercise.name}
                                  </FormLabel>
                                </AccordionTrigger>
                                <AccordionContent>
                                  <span className="border-b-2" />

                                  <div className="grid grid-cols-4 gap-4">
                                    <FormLabel>Set</FormLabel>
                                    <FormLabel>Previous</FormLabel>
                                    <FormLabel>lbs</FormLabel>
                                    <FormLabel>Reps</FormLabel>

                                    {Array(exercise.ExerciseInstance?.length)
                                      .fill(null)
                                      .map((_, idx) => {
                                        return (
                                          <Fragment
                                            key={`${exercise.exercise.id}-${idx}`}
                                          >
                                            <FormLabel>{idx + 1}</FormLabel>
                                            <FormLabel>
                                              {"prev weight"}
                                            </FormLabel>
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
                                                    value={exercise.exercise.id}
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
                                            <SwitchWrapper
                                              checked={field.value}
                                              onCheckedChange={field.onChange}
                                              id="is-finished"
                                              text="Finished?"
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
                      }
                    )}
                </CardContent>
                <CardFooter>
                  <DialogClose asChild>
                    <Button disabled={!isDirty} type="submit">
                      Save
                    </Button>
                  </DialogClose>
                </CardFooter>
              </Card>
            </form>
          </Form>
          {/* <DevTool control={form.control} /> */}
        </>
      )}
    </>
  );
};
