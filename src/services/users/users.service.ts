import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import {
  TCreateUsersReturn,
  TCreateUsers,
  TGetUsers,
  TUpdateUsers,
} from "../../interfaces";
import {
  createUsersReturnSchema,
  getUsersSchema,
  updateUsersSchema,
} from "../../schemas";
import { AppError } from "../../error";

const create = async (payload: TCreateUsers): Promise<TCreateUsersReturn> => {
  const usersRepository: Repository<User> = AppDataSource.getRepository(User);

  const user = usersRepository.create(payload);

  await usersRepository.save(user);

  const newUser = createUsersReturnSchema.parse(user);

  return newUser;
};

const read = async (): Promise<TGetUsers> => {
  const usersRepository: Repository<User> = AppDataSource.getRepository(User);

  const findUsers: Array<User> = await usersRepository.find();

  const users = getUsersSchema.parse(findUsers);

  return users;
};

const update = async (
  payload: TUpdateUsers,
  userId: number
): Promise<TCreateUsersReturn> => {
  const usersRepository: Repository<User> = AppDataSource.getRepository(User);

  const findUser: User | null = await usersRepository.findOneBy({
    id: userId,
  });

  if (!findUser) {
    throw new AppError("insuficient permission", 403);
  }

  const updateUser = usersRepository.create({
    ...findUser,
    ...payload,
  });

  await usersRepository.save(updateUser);

  const updatedUser = createUsersReturnSchema.parse(updateUser);

  return updatedUser;
};

const destroy = async (userId: number): Promise<void> => {
  const usersRepository: Repository<User> = AppDataSource.getRepository(User);

  const user = await usersRepository.findOneBy({
    id: userId,
  });

  await usersRepository.softRemove(user!);
};

export default { create, read, update, destroy };
