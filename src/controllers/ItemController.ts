import { Items } from '../entity/items'
import { ItemRepository } from '../models/repository/ItemRepository'
import { LocationRepository } from '../models/repository/LocationRepository'

export const getList = async () : Promise<Items[] | null> => {
    let itemRepository = new ItemRepository()
    let result = await itemRepository.getAll()
    return result
}

export const addItem = async (body: object) : Promise<object> => {
    let itemRepository = new ItemRepository()
    let locationRepository = new LocationRepository()
    try {
        let location = null
        let existingLocation = await locationRepository.getOne(body['location'])
        if (!existingLocation) {
            location = await locationRepository.createLocation(body['location'])
        }
        body['location'] = location ? location['location_id'] : existingLocation['location_id']
        let result = await itemRepository.createItem(body)
        return {
            "success": true,
            "body": result
        }
    } catch (error) {
        return {
            "success": false,
            "error": error.message 
        }
    }
}