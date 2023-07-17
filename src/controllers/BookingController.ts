import { ItemRepository } from '../models/repository/ItemRepository'

export const book = async (item_id: number) : Promise<boolean> => {
    let itemRepository = new ItemRepository()
    let item = await itemRepository.getOne(item_id)
    if (!item) {
        throw new Error(`Item of id ${item_id} does not exist`)
    }
    if (item['availability'] <= 0) {
        throw new Error(`No rooms available for item of id ${item_id}`)
    }
    item['availability'] -= 1
    itemRepository.saveItem(item, item['item_id'])
    return true
}