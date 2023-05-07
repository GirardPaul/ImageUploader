import "reflect-metadata";
import { DataSource } from "typeorm";
import { Documents } from "../../entities/Documents";

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.API_DB_URL,
  ssl: true,
  synchronize: true,
  logging: false,
  entities: [Documents],
  migrations: [],
  subscribers: [],
});