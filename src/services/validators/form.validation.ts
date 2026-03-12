import { z } from "zod";

export const TaskSchema = z.object({
  name: z.string().min(5, "Name must be at least 5 characters"),
  description: z
    .string()
    .min(10, "Description is too short")
    .max(1000, "Maximum 1000 characters allowed"),
  date: z.date().optional().nullable(),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  isImportant: z.boolean(),
});

export type TaskForm = z.infer<typeof TaskSchema>;
