import "reflect-metadata"
import { DataSource } from "typeorm"
import { Items } from "../entity/Items"
import { Locations } from "../entity/Locations"

require('dotenv').config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    synchronize: false,
    logging: false,
    entities: [Items, Locations],
    migrations: [],
    subscribers: [],
})