import "reflect-metadata"
import { AppDataSource } from "../data-source"
import { Items } from "../../entity/Items"
import { DeleteResult, FindManyOptions, FindOneOptions } from "typeorm"

export class ItemRepository {
    getAll = async (query?: object) : Promise<Items[]> => {
        if (Object.keys(query).length != 0) {
            query = this.formatQueryParams(query)
        }
        try {
            await AppDataSource.initialize()
            const options: FindManyOptions<Items> = {
                relations: ['location'],
                where: query
            };
            let items = await AppDataSource.manager.find(Items, options)
            await AppDataSource.destroy()
            return items
        } catch (error) {
            await AppDataSource.destroy()
        }
    }

    getOne = async (item_id: number, query?: object) : Promise<Items> => {
        try {
            await AppDataSource.initialize()
            const options: FindOneOptions<Items> = {
                relations: ['location'],
                where: { item_id: item_id }
            };
            let item = await AppDataSource.manager.findOne(Items, options)
            await AppDataSource.destroy()
            return item
        } catch (error) {
            await AppDataSource.destroy()
        }
    }

    saveItem = async (validatedItem: object, item_id?: number) : Promise<object> => {
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
            item.item_id = Number(item_id)
            await AppDataSource.manager.save(item)
            await AppDataSource.destroy()
            return item
        } catch (error) {
            await AppDataSource.destroy()
        }
    }

    deleteItem = async (item_id: number) : Promise<DeleteResult> => {
        try {
            await AppDataSource.initialize()
            let result = await AppDataSource.manager.delete(Items, { item_id: item_id })
            await AppDataSource.destroy()
            return result
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

    formatQueryParams = (query: object) : object => {
        const allowedQueryParams = ["rating", "reputation_badge", "city"]
        Object.keys(query).forEach(key => {
            if (!allowedQueryParams.includes(key)) {
                delete query[key];
            }
        });
        if (query.hasOwnProperty('city')) {
            let location = {city: query['city']}
            query['location'] = location
            delete query['city']
        }
        return query;
    }
}