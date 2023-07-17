import { Items } from '../entity/Items'
import { ItemRepository } from '../models/repository/ItemRepository'
import { LocationRepository } from '../models/repository/LocationRepository'

export const getList = async () : Promise<Items[] | null> => {
    let itemRepository = new ItemRepository()
    let result = await itemRepository.getAll()
    return result
}

export const getOne = async (item_id: number) : Promise<Items | null> => {
    let itemRepository = new ItemRepository()
    let result = await itemRepository.getOne(item_id)
    return result
}

export const saveItem = async (body: object, item_id: number = null) : Promise<object> => {
    let itemRepository = new ItemRepository()
    try {
        if (item_id) {
            let item = await getOne(item_id)
            if (!item) {
                return null
            }
        }
        body['location'] = await getLocation(body['location'])
        let result = await itemRepository.saveItem(body, item_id)
        return result
    } catch (error) {
        return {
            "success": false,
            "error": error.message 
        }
    }
}

export const deleteItem = async (item_id: number) : Promise<boolean> => {
    let itemRepository = new ItemRepository()
    let item = await getOne(item_id)
    if (item == null) {
        return false
    }
    await itemRepository.deleteItem(item['item_id'])
    return true
}

const getLocation = async (locationObj: object) => {
    let locationRepository = new LocationRepository()
    let location = null
    let existingLocation = await locationRepository.getOne(locationObj)
    if (!existingLocation) {
        location = await locationRepository.createLocation(locationObj)
    }
    return location ? location['location_id'] : existingLocation['location_id']
}