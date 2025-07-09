import { z } from "zod";

type UserMetaData = {
  sub: string;
  email: string;
  lastName: string;
  firstName: string;
  username: string | null;
};

export const User = z.object({
  id: z.string(),
  email: z.string().email(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  username: z.string().min(1),
  avatarUrl: z.string().url().nullable(),
  contactNumber: z.string(),
  position: z.string(),
});

export type User = z.infer<typeof User>;
