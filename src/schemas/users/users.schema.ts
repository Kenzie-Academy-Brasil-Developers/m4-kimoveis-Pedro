import { z } from "zod";

const usersSchema = z.object({
  id: z.number(),
  name: z.string().max(45),
  email: z.string().email().max(45),
  admin: z.boolean().default(false),
  password: z.string().max(120),
  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.string().nullable(),
});

const createUsersSchema = usersSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
});

const createUsersReturnSchema = usersSchema.omit({ password: true });

const getUsersSchema = createUsersReturnSchema.array();

const updateUsersSchema = usersSchema.partial().omit({ id: true, admin: true });

const usersLoginSchema = usersSchema.pick({ email: true, password: true });

export {
  usersSchema,
  createUsersSchema,
  createUsersReturnSchema,
  getUsersSchema,
  updateUsersSchema,
  usersLoginSchema,
};
