import { ItemRepository } from '../models/repository/ItemRepository'

export const book = async (item_id: number) : Promise<number> => {
    let itemRepository = new ItemRepository()
    let item = await itemRepository.getOne(item_id)
    if (!item) {
        return 404
    }
    if (item['availability'] <= 0) {
        return 403
    }
    item['availability'] -= 1
    itemRepository.saveItem(item, item['item_id'])
    return 200
}