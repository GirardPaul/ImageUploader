import "reflect-metadata";
import { DataSource } from "typeorm";
import { Documents } from "../../entities/Documents";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "src/config/db/database.sqlite",
  synchronize: true,
  logging: false,
  entities: [Documents],
  migrations: [],
  subscribers: [],
});
