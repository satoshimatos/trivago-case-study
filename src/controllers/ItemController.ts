import { Items } from '../entity/items'
import { ItemRepository } from '../models/repository/ItemRepository'

export const getList = async () : Promise<Items[] | null> => {
    let itemRepository = new ItemRepository()
    let result = await itemRepository.getAll()
    return result
}

export const addItem = async (body: string) : Promise<string> => {
    let itemRepository = new ItemRepository(body)
    // let result = await itemRepository.createItem()
    return "a"
}