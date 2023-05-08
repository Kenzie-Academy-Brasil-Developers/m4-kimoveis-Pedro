import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { TCreateUsersReturn, TCreateUsers } from "../../interfaces";
import { createUsersReturnSchema } from "../../schemas";

const create = async (payload: TCreateUsers): Promise<TCreateUsersReturn> => {
  const usersRepository: Repository<User> = AppDataSource.getRepository(User);

  const user = usersRepository.create(payload);

  await usersRepository.save(user);

  const newUser = createUsersReturnSchema.parse(user);

  return newUser;
};

export default { create };
