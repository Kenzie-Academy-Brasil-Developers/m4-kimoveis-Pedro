import { z } from 'zod'
import { createRealEstateReturnSchema, createRealEstateSchema, getRealEstateSchema } from '../../schemas'

type TCreateRealEstate = z.infer<typeof createRealEstateSchema>

type TCreateRealEstateReturn = z.infer<typeof createRealEstateReturnSchema>

type TGetRealEstates = z.infer<typeof getRealEstateSchema>

export {
    TCreateRealEstate,
    TCreateRealEstateReturn,
    TGetRealEstates
}