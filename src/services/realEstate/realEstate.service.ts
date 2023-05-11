import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Address, Category, RealEstate } from "../../entities";
import { AppError } from "../../error";
import { TCreateRealEstate, TCreateRealEstateReturn } from "../../interfaces";


const create = async (payload: TCreateRealEstate): Promise<TCreateRealEstateReturn> => {
    const realEstatesRepository: Repository<RealEstate> = AppDataSource.getRepository(RealEstate)
    const addressesRepository: Repository<Address> = AppDataSource.getRepository(Address)
    const categoriesRepository: Repository<Category> = AppDataSource.getRepository(Category)

    const address = payload.address

    const newAdress: Address = addressesRepository.create(address)

    await addressesRepository.save(newAdress)

    const categoryData = await categoriesRepository.findOneBy({
        id: payload.categoryId
    })

    if (!categoryData) throw new AppError('Category not found', 404)

    const newRealEstate: RealEstate = realEstatesRepository.create({ ...payload, address: newAdress, category: categoryData })

    await realEstatesRepository.save(newRealEstate)

    return newRealEstate
}

export default { create }