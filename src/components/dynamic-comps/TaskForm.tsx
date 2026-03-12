"use client";

import { Card } from "@/components/ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Clock2Icon } from "lucide-react";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Button } from "../ui/button";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TaskSchema,
  TaskForm as TaskFormType,
} from "@/services/validators/form.validation";
import { Star } from "lucide-react";
import {
  useAddTaskMutation,
  useEditTaskMutation,
} from "@/hooks/reactQuary/useTaskMutation";

interface TaskFormProps {
  task?: any;
  onClose?: () => void;
}

const TaskForm = ({ task, onClose }: TaskFormProps) => {
  const isEditMode = !!task;

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<TaskFormType>({
    resolver: zodResolver(TaskSchema),
    defaultValues: {
      name: task?.name || "",
      description: task?.description || "",
      date: task?.date ? new Date(task.date) : null,
      startTime: task?.start || "10:30:00",
      endTime: task?.end || "12:30:00",
      isImportant: task?.isImportant || false,
    },
  });

  const { mutate: addTask, isPending: isAdding } = useAddTaskMutation();
  const { mutate: editTask, isPending: isEditing } = useEditTaskMutation();

  const isPending = isAdding || isEditing;

  const onSubmit = (data: TaskFormType) => {
    if (isEditMode) {
      editTask(
        { id: task.id, task: data },
        {
          onSuccess: () => {
            onClose?.();
          },
        },
      );
    } else {
      addTask(data, {
        onSuccess: () => {
          reset();
          onClose?.();
        },
      });
    }
  };

  return (
    <Card className="w-full max-w-md py-6 sm:py-8 px-1 sm:px-2 max-h-[95vh] overflow-y-auto bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 transition-colors shadow-2xl rounded-3xl sm:rounded-[2.5rem]">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 px-4">
        <div className="flex justify-between items-center bg-zinc-50 dark:bg-zinc-800/50 p-3 rounded-2xl border border-zinc-100 dark:border-zinc-700">
          <div className="flex flex-col">
            <span className="text-sm font-bold text-zinc-900 dark:text-white">
              {isEditMode ? "Edit Task" : "New Task"}
            </span>
            <span className="text-[10px] text-zinc-500">
              {isEditMode ? "Update your task details" : "Create a new task"}
            </span>
          </div>

          <Controller
            name="isImportant"
            control={control}
            render={({ field }) => (
              <button
                type="button"
                onClick={() => field.onChange(!field.value)}
                className={`p-2 rounded-xl transition-all ${field.value ? "bg-amber-100 dark:bg-amber-500/20 text-amber-500 scale-110 shadow-sm" : "bg-zinc-100 dark:bg-zinc-800 text-zinc-400 hover:text-zinc-600"}`}
              >
                <Star size={20} fill={field.value ? "currentColor" : "none"} />
              </button>
            )}
          />
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="name"
            className="dark:text-zinc-300 text-xs font-bold uppercase tracking-wider"
          >
            Task Name
          </Label>
          <Input
            id="name"
            {...register("name")}
            placeholder="Focus on the project..."
            className="h-11 bg-white dark:bg-zinc-800 dark:border-zinc-700 focus-visible:ring-brand rounded-xl"
          />
          {errors.name && (
            <p className="text-red-500 text-[10px] font-bold mt-1 ml-1 px-2">
              {errors.name.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="description"
            className="dark:text-zinc-300 text-xs font-bold uppercase tracking-wider"
          >
            Description
          </Label>
          <Textarea
            id="description"
            {...register("description")}
            placeholder="What needs to be done?"
            className="min-h-[100px] bg-white dark:bg-zinc-800 dark:border-zinc-700 focus-visible:ring-brand rounded-xl resize-none"
          />
          {errors.description && (
            <p className="text-red-500 text-[10px] font-bold mt-1 ml-1 px-2">
              {errors.description.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2 justify-center items-center border border-zinc-200 dark:border-zinc-800 p-2 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50">
          <Label className="dark:text-zinc-300 text-xs font-bold uppercase tracking-wider">
            Target Date
          </Label>
          <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <Calendar
                mode="single"
                selected={field.value ?? undefined}
                onSelect={(val) => field.onChange(val)}
                className="p-2 rounded-xl bg-white dark:bg-zinc-900 shadow-sm border dark:border-zinc-700"
              />
            )}
          />
          {errors.date && (
            <p className="text-red-500 text-[10px] font-bold mt-1">
              {errors.date.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Field className="space-y-2">
            <FieldLabel
              htmlFor="startTime"
              className="dark:text-zinc-300 text-xs font-bold uppercase tracking-wider"
            >
              Start
            </FieldLabel>
            <InputGroup className="bg-white dark:bg-zinc-800 dark:border-zinc-700 rounded-xl overflow-hidden">
              <Controller
                name="startTime"
                control={control}
                render={({ field }) => (
                  <InputGroupInput
                    id="startTime"
                    type="time"
                    step="1"
                    {...field}
                    className="h-10 appearance-none font-medium dark:text-zinc-200 [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                  />
                )}
              />
              <InputGroupAddon className="dark:bg-zinc-700">
                <Clock2Icon className="text-brand" size={14} />
              </InputGroupAddon>
            </InputGroup>
            {errors.startTime && (
              <p className="text-red-500 text-[10px] font-bold">
                {errors.startTime.message}
              </p>
            )}
          </Field>

          <Field className="space-y-2">
            <FieldLabel
              htmlFor="endTime"
              className="dark:text-zinc-300 text-xs font-bold uppercase tracking-wider"
            >
              End
            </FieldLabel>
            <InputGroup className="bg-white dark:bg-zinc-800 dark:border-zinc-700 rounded-xl overflow-hidden">
              <Controller
                name="endTime"
                control={control}
                render={({ field }) => (
                  <InputGroupInput
                    id="endTime"
                    type="time"
                    step="1"
                    {...field}
                    className="h-10 appearance-none font-medium dark:text-zinc-200 [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                  />
                )}
              />
              <InputGroupAddon className="dark:bg-zinc-700">
                <Clock2Icon className="text-brand" size={14} />
              </InputGroupAddon>
            </InputGroup>
            {errors.endTime && (
              <p className="text-red-500 text-[10px] font-bold">
                {errors.endTime.message}
              </p>
            )}
          </Field>
        </div>

        <Button
          type="submit"
          disabled={isPending}
          className="w-full bg-brand cursor-pointer hover:opacity-90 text-white font-bold h-12 rounded-2xl shadow-lg shadow-brand/20 transition-all active:scale-[0.98]"
        >
          {isPending
            ? isEditMode
              ? "Updating..."
              : "Adding..."
            : isEditMode
              ? "Update Task"
              : "Create Task"}
        </Button>
      </form>
    </Card>
  );
};

export default TaskForm;
