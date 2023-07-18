import { Locations } from '../entity/Locations'
import { LocationRepository } from '../models/repository/LocationRepository'

export const getOneById = async (location_id: number) : Promise<Locations | null> => {
    let locationRepository = new LocationRepository()
    let result = await locationRepository.getOneById(location_id)
    return result
}