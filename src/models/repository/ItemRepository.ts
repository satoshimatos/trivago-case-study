import "reflect-metadata"
import { AppDataSource } from "../data-source"
import { Items } from "../../entity/items"
import { Locations } from "../../entity/locations"

export class ItemRepository {
    
    getAll = async () : Promise<Items[]> => {
        await AppDataSource.initialize()
        let items = await AppDataSource.manager.find(Items)
        await AppDataSource.destroy()
        return items
    }

    createItem = async (
        name: string,
        category: number,
        image: string,
        reputation: number,
        reputation_badge: string,
        price: number,
        availability: number,
        location: Locations
    ) : Promise<boolean> => {
        await AppDataSource.initialize()
        const item = new Items()
        item.name = name
        item.category = category
        item.image = image
        item.reputation = reputation
        item.reputation_badge = reputation_badge
        item.price = price
        item.availability = availability
        item.location = location
        await AppDataSource.manager.save(item)
        await AppDataSource.destroy()
        return true
    }

    updateItem = async (
        item_id: number,
        name: string,
        category: number,
        image: string,
        reputation: number,
        reputation_badge: string,
        price: number,
        availability: number,
        location: Locations
    ) => {
        await AppDataSource.initialize()
        await AppDataSource.manager
            .createQueryBuilder(Items, "item")
            .update()
            .where("item_id = :id", { id: item_id })
            .set({
                name: name,
                category: category,
                image: image,
                reputation: reputation,
                reputation_badge: reputation_badge,
                price: price,
                availability: availability,
                location: location
            })
            .execute()
        await AppDataSource.destroy()
        return true
    }

    deleteItem = async (
        item_id: number
    ) => {
        await AppDataSource.initialize()
        await AppDataSource.manager
        .createQueryBuilder(Items, "item")
        .delete()
        .from(Items)
        .where("item_id = :id", {id: item_id})
        .execute()
        await AppDataSource.destroy()
    }
}