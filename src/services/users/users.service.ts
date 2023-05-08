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

const post = async (payload: TCreateUsers): Promise<TCreateUsersReturn> => {
  const usersRepository: Repository<User> = AppDataSource.getRepository(User);

  const user = usersRepository.create(payload);

  await usersRepository.save(user);

  const newUser = createUsersReturnSchema.parse(user);

  return newUser;
};

const get = async (): Promise<TGetUsers> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const findUsers: Array<User> = await userRepository.find();

  const users = getUsersSchema.parse(findUsers);

  return users;
};

const patch = async (
  payload: TUpdateUsers,
  userId: number
): Promise<TCreateUsersReturn> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const oldPayload = await userRepository.findOneBy({
    id: userId,
  });
  const userNewData = userRepository.create({
    ...oldPayload,
    ...payload,
  });
  await userRepository.save(userNewData);

  const newUser = createUsersReturnSchema.parse(userNewData);
  return newUser;
};

export default { post, get, patch };
