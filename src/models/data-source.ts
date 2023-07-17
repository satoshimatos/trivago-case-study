import "reflect-metadata"
import { DataSource } from "typeorm"
import { Items } from "../entity/Items"
import { Locations } from "../entity/Locations"

require('dotenv').config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false,
    logging: false,
    entities: [Items, Locations],
    migrations: [],
    subscribers: [],
})