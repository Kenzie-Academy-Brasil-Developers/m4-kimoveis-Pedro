import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { RealEstate, Schedule, User } from "../../entities";
import { AppError } from "../../error";
import { TCreateRealEstateReturn, TCreateSchedules } from "../../interfaces";

const create = async (payload: TCreateSchedules, userId: number) => {
  const schedulesRepository: Repository<Schedule> =
    AppDataSource.getRepository(Schedule);

  const realEstateRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const usersRepository: Repository<User> = AppDataSource.getRepository(User);

  const realEstate = await realEstateRepository.findOneBy({
    id: payload.realEstateId,
  });
  if (!realEstate) {
    throw new AppError("RealEstate not found", 404);
  }

  const user = await usersRepository.findOneBy({
    id: userId,
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const schedule = await AppDataSource.createQueryBuilder(Schedule, "schedule")
    .where("schedule.date = :date AND schedule.hour = :hour", {
      date: payload.date,
      hour: payload.hour,
    })
    .andWhere("schedule.realEstate = :realEstateId", {
      realEstateId: payload.realEstateId,
    })
    .getOne();

  if (schedule) {
    throw new AppError(
      "Schedule to this real estate at this date and time already exists",
      409
    );
  }

  const existingScheduleForUser = await AppDataSource.createQueryBuilder(
    Schedule,
    "schedule"
  )

    .where("schedule.date = :date AND schedule.hour = :hour", {
      date: payload.date,
      hour: payload.hour,
    })
    .andWhere("schedule.user = :userId", { userId })
    .getOne();

  if (existingScheduleForUser) {
    throw new AppError(
      "User schedule to this real estate at this date and time already exists",
      409
    );
  }

  const hourOfTheDay = Number(payload.hour.split(":")[0]);

  if (hourOfTheDay < 8 || hourOfTheDay > 17) {
    throw new AppError("Invalid hour, available times are 8AM to 18PM", 400);
  }

  const date = new Date(payload.date);

  const dayOfTheWeek = date.getDay();
  if (dayOfTheWeek === 0 || dayOfTheWeek === 6) {
    throw new AppError("Invalid date, work days are monday to friday", 400);
  }

  const newSchedule = schedulesRepository.create({
    ...payload,
    realEstate,
    user,
  });

  await schedulesRepository.save(newSchedule);

  return newSchedule;
};

const read = async (realEstateId: number): Promise<TCreateRealEstateReturn> => {
  const realEstateRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const findRealEstate: RealEstate | null = await realEstateRepository.findOne({
    where: {
      id: realEstateId,
    },
    relations: {
      address: true,
      category: true,
      schedules: {
        user: true,
      },
    },
  });

  if (!findRealEstate) {
    throw new AppError("RealEstate not found", 404);
  }

  return findRealEstate;
};

export default { create, read };
