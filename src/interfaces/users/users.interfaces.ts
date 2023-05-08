import { z } from "zod";
import {
  createUsersReturnSchema,
  createUsersSchema,
  getUsersSchema,
  usersSchema,
} from "../../schemas";
import { DeepPartial } from "typeorm";

type TUser = z.infer<typeof usersSchema>;

type TCreateUsers = z.infer<typeof createUsersSchema>;

type TCreateUsersReturn = z.infer<typeof createUsersReturnSchema>;

type TGetUsers = z.infer<typeof getUsersSchema>;

type TUpdateUsers = DeepPartial<TCreateUsers>;

export { TUser, TCreateUsers, TCreateUsersReturn, TGetUsers, TUpdateUsers };
