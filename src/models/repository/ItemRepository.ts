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
}