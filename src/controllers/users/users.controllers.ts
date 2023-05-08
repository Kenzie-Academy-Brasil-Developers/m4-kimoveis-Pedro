import { Request, Response } from "express";
import { TCreateUsers } from "../../interfaces";
import { usersService } from "../../services";

const post = async (req: Request, res: Response): Promise<Response> => {
  const payload: TCreateUsers = req.body;

  const newUser = await usersService.post(payload);

  return res.status(201).json(newUser);
};

export const get = async (req: Request, res: Response): Promise<Response> => {
  return res.json();
};

export const update = async (
  req: Request,
  res: Response
): Promise<Response> => {
  return res.status(200).json();
};

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  return res.status(204).send();
};

export default { post, get, update, deleteUser };
