import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import {
  TCreateUsersReturn,
  TCreateUsers,
  TGetUsers,
  TUpdateUsers,
} from "../../interfaces";
import { createUsersReturnSchema, getUsersSchema } from "../../schemas";

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

  const oldPayload = await usersRepository.findOneBy({
    id: userId,
  });

  const NewPayload = usersRepository.create({
    ...oldPayload,
    ...payload,
  });

  await usersRepository.save(NewPayload);

  const newUser = createUsersReturnSchema.parse(NewPayload);

  return newUser;
};

const destroy = async (userId: number): Promise<void> => {
  const usersRepository: Repository<User> = AppDataSource.getRepository(User);

  const user = await usersRepository.findOneBy({
    id: userId,
  });

  await usersRepository.softRemove(user!);
};

export default { create, read, update, destroy };
