import { Request, Response } from "express";

const post = async (req: Request, res: Response): Promise<Response> => {
  return res.status(201).json();
};

const get = async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).json();
};
const getAllRealEstate = async (
  req: Request,
  res: Response
): Promise<Response> => {
  return res.status(200).json();
};

export default {
  post,
  get,
  getAllRealEstate,
};
