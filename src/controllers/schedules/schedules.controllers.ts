import { Request, Response } from "express";
import { schedulesService } from "../../services";
import { TCreateSchedules } from "../../interfaces";

const create = async (req: Request, res: Response): Promise<Response> => {
  const payload: TCreateSchedules = req.body;

  const userId: number = res.locals.id;

  await schedulesService.create(payload, userId);

  return res.status(201).json({ message: "Schedule created" });
};

const read = async (req: Request, res: Response): Promise<Response> => {
  const realEstateId: number = Number(req.params.id);

  const schedules = await schedulesService.read(realEstateId);

  return res.json(schedules);
};

export default {
  create,
  read,
};
