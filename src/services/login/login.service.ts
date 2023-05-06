import { Repository } from "typeorm";
import { TLogin } from "../../interfaces";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../error";
import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

const createToken = async (payload: TLogin): Promise<string> => {
  const userRepository = (Repository<User> = AppDataSource.getRepository(User));

  const user: User | null = await userRepository.findOneBy({
    email: payload.email,
  });

  if (!user) {
    throw new AppError("Wrong email/password", 401);
  }

  const passwordMatch = await compare(payload.password, user.password);

  if (!passwordMatch) {
    throw new AppError("Wrong email/password", 401);
  }

  const token: string = jwt.sign(
    {
      id: user.id,
      admin: user.admin,
    },
    process.env.SECRET_KEY!,
    {
      expiresIn: "24h",
      subject: String(user.id),
    }
  );

  return token;
};

export default { createToken };
