import { z } from "zod";
import {
  createUsersReturnSchema,
  createUsersSchema,
  updateUsersSchema,
  usersSchema,
} from "../../schemas";

type TUser = z.infer<typeof usersSchema>;

type TCreateUsers = z.infer<typeof createUsersSchema>;

type TCreateUsersReturn = z.infer<typeof createUsersReturnSchema>;

type TUpdateUsers = z.infer<typeof updateUsersSchema>;

export { TUser, TCreateUsers, TCreateUsersReturn, TUpdateUsers };
