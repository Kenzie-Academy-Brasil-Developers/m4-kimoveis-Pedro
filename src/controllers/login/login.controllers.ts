import { Request, Response } from "express";
import { TLogin } from "../../interfaces";
import { loginService } from "../../services";


const createToken = async (req: Request, res: Response): Promise<Response> => {
  const payload: TLogin = req.body;

  const token = await loginService.createToken(payload);

  return res.json({ token });
};

export default { createToken };
