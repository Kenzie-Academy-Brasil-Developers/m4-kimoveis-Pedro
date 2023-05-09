import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entities";
import { AppError } from "../error";

const email = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const usersRepository: Repository<User> = AppDataSource.getRepository(User);

  const userEmail = req.body.email;

  if (userEmail) {
    const exists = await usersRepository.findOneBy({
      email: userEmail,
    });

    if (exists) {
      throw new AppError("Email already exists", 409);
    }
  }

  next();
};

const isUserExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const userdId: number = Number(req.params.id);

  const findUser = await userRepository.findOneBy({
    id: userdId,
  });

  if (!findUser) {
    throw new AppError("User not found", 404);
  }

  return next();
};

const isAdminOrOwner = (
  req: Request,
  resp: Response,
  next: NextFunction
): void => {
  const { admin, id } = resp.locals;
  const userId = req.params.id;

  if (!admin && Number(id) !== Number(userId)) {
    throw new AppError("Insufficient permission", 403);
  }

  return next();
};

export default { email, isUserExists, isAdminOrOwner };
