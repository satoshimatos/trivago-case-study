import { Items } from '../entity/items'
import { ItemRepository } from '../models/repository/ItemRepository'

export const getList = async () : Promise<Items[] | null> => {
    let itemRepository = new ItemRepository()
    let result = await itemRepository.getAll()
    return result
}