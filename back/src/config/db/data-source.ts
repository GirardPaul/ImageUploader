import "reflect-metadata";
import { DataSource } from "typeorm";
import { Documents } from "../../entities/Documents";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "tmp/database.sqlite",
  synchronize: true,
  logging: false,
  entities: [Documents],
  migrations: [],
  subscribers: [],
});
