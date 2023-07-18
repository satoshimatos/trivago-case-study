import "reflect-metadata"
import { AppDataSource } from "../data-source"
import { Locations } from "../../entity/Locations"
import { FindOneOptions } from "typeorm"

export class LocationRepository {
    getAll = async () : Promise<Locations[]> => {
        try {
            await AppDataSource.initialize()
            let locations = await AppDataSource.manager.find(Locations)
            await AppDataSource.destroy()
            return locations
        } catch (error) {
            await AppDataSource.destroy()
        }
    }

    getOne = async (locationObj: object) : Promise<Locations> => {
        try {
            await AppDataSource.initialize()
            let location = await AppDataSource.manager
                .createQueryBuilder(Locations, "location")
                .where("location.city = :city", { city: locationObj['city'] })
                .andWhere("location.state = :state", { state: locationObj['state'] })
                .andWhere("location.country = :country", { country: locationObj['country'] })
                .andWhere("location.zip_code = :zip_code", { zip_code: locationObj['zip_code'] })
                .andWhere("location.address = :address", { address: locationObj['address'] })
                .getOne()
            await AppDataSource.destroy()
            return location
        } catch (error) {
            await AppDataSource.destroy()
        }
    }

    createLocation = async (validatedLocation: object) : Promise<object> => {
        try {
            await AppDataSource.initialize()
            let location = new Locations()
            location.city = validatedLocation['city']
            location.state = validatedLocation['state']
            location.country = validatedLocation['country']
            location.zip_code = validatedLocation['zip_code']
            location.address = validatedLocation['address']
            await AppDataSource.manager.save(location)
            await AppDataSource.destroy()
            return location
        } catch (error) {
            await AppDataSource.destroy()
        }
    }

    getOneById = async (location_id: number) : Promise<Locations> => {
        try {
            await AppDataSource.initialize()
            const options: FindOneOptions<Locations> = {
                where: { location_id: location_id },
            };
            let location = await AppDataSource.manager.findOne(Locations, options)
            await AppDataSource.destroy()
            return location
        } catch (error) {
            await AppDataSource.destroy()
        }
    }
}