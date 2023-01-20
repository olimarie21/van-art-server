import "reflect-metadata"
import { DataSource } from "typeorm"
import { ArtLocation } from "./entity/ArtLocation"
import * as dotenv from "dotenv"

dotenv.config()

const port: number = parseInt(process.env.PORT)

export const AppDataSource = new DataSource({
    type: "postgres",
    port: port,
    url: process.env.DATABASE_URL,
    synchronize: true,
    logging: false,
    entities: [ArtLocation],
    migrations: [],
    subscribers: [],
    ssl: true,
    extra: {
    ssl: {
        rejectUnauthorized: false,
    }}
})