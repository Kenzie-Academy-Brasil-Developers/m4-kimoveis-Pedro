import { Request, Response } from "express";
import { TCreateRealEstate } from "../../interfaces";
import { realEstateService } from "../../services";

const create = async (req: Request, res: Response): Promise<Response> => {
  const payload: TCreateRealEstate = req.body
  const realEstateCreated = await realEstateService.create(payload)

  return res.status(201).json(realEstateCreated)
}

const read = async (req: Request, res: Response): Promise<Response> => {


  return res.status(200).json()
}

export default {
  create,
  read,
};
