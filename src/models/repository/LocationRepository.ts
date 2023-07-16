import "reflect-metadata"
import { AppDataSource } from "../data-source"
import { Locations } from "../../entity/locations"

export class LocationRepository {
    getOne = async (location_id: number) : Promise<Locations> => {
        await AppDataSource.initialize()
        let location = await AppDataSource.manager
            .createQueryBuilder(Locations, "location")
            .where("location.location_id = :id", { id: location_id })
            .getOne()
        await AppDataSource.destroy()
        return location
    }
}