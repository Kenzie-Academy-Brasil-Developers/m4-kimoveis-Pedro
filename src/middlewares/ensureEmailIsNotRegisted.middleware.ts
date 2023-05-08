import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { AppError } from "../error";
import { User } from "../entities";
import { Repository } from "typeorm";

const verify = async (
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
      throw new AppError("Email already exists.", 409);
    }
  }

  next();
};

export default { verify };
