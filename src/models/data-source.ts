import "reflect-metadata"
import { DataSource } from "typeorm"
import { Items } from "../entity/items"
import { Locations } from "../entity/locations"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "silly.db.elephantsql.com",
    port: 5432,
    username: "cqbmccgf",
    password: "szWIt_0oNHaRoGiVbtI7-Pr9nPWh7-CA",
    database: "cqbmccgf",
    synchronize: false,
    logging: false,
    entities: [Items, Locations],
    migrations: [],
    subscribers: [],
})