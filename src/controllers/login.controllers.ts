import { Request, Response } from "express";

const createToken = async (req: Request, res: Response): Promise<Response> => {
  return res.json();
};

export default { createToken };
