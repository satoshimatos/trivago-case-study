import "reflect-metadata"
import { AppDataSource } from "../data-source"
import { Items } from "../../entity/items"
import { Locations } from "../../entity/locations"

export class ItemRepository {
    getAll = async () : Promise<Items[]> => {
        try {
            await AppDataSource.initialize()
            let items = await AppDataSource.manager.find(Items)
            await AppDataSource.destroy()
            return items
        } catch (error) {
            await AppDataSource.destroy()
        }
    }

    createItem = async (validatedItem: object) : Promise<object> => {
        try {
            await AppDataSource.initialize()
            let item = new Items()
            item.name = validatedItem['name']
            item.rating = validatedItem['rating']
            item.category = validatedItem['category']
            item.image = validatedItem['image']
            item.reputation = validatedItem['reputation']
            item.price = validatedItem['price']
            item.availability = validatedItem['availability']
            item.location = validatedItem['location']
            item.reputation_badge = this.generateReputationBadge(validatedItem['reputation'])
            await AppDataSource.manager.save(item)
            await AppDataSource.destroy()
            return item
        } catch (error) {
            await AppDataSource.destroy()
        }
    }

    generateReputationBadge = (reputation: number) : string => {
        let reputationBadge = ''
        if (reputation <= 500) {
            reputationBadge = 'red'
        } else if (reputation > 500 && reputation <= 799) {
            reputationBadge = 'yellow'
        } else {
            reputationBadge = 'green'
        }
        return reputationBadge
    }
}