import { z } from "zod";

const usersSchema = z.object({
  id: z.number(),
  email: z.string().email().max(45),
  admin: z.boolean().default(false),
  password: z.string().max(120),
  createdAt: z.date(),
  updateddAt: z.date(),
  deletedAt: z.date().nullable(),
});

const createUsersSchema = usersSchema.omit({
  id: true,
  createdAt: true,
  updateddAt: true,
  deletedAt: true,
});

const createUsersReturnSchema = usersSchema.omit({ password: true });

const getUsersSchema = createUsersReturnSchema.array();

const updateUsersSchema = usersSchema.omit({ id: true, admin: true });

const usersLoginSchema = usersSchema.pick({ email: true, password: true });

export {
  usersSchema,
  createUsersSchema,
  createUsersReturnSchema,
  getUsersSchema,
  updateUsersSchema,
  usersLoginSchema,
};
