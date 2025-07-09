import { z } from "zod";


export type Task = {
  id: string; // bigint -> string
  created_at: string; // ISO string
  title: string;
  date: string;
  priority?: string | null;
  description?: string | null;
  user_id?: string | null;
  status?: string | null;
};

// Zod 
export const Task = z.object({
  id: z.string(), 
  created_at: z.string().datetime(), 
  title: z.string().min(1),
  date: z.string(), 
  priority: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  user_id: z.string().uuid().optional().nullable(),
  status: z.string().optional().nullable(),
});

export type TaskType = z.infer<typeof Task>;
