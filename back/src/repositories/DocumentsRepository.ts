import { Service } from "typedi";
import { AbstractRepository } from "../config/repository/AbstractRepository";
import { Documents } from "../entities/Documents";
import { AppDataSource } from "../config/db/data-source";

@Service()
export class DocumentsRepository extends AbstractRepository<Documents> {
    constructor() {
        super(AppDataSource.getRepository(Documents));
    }

    public async findAllSorted(): Promise<Documents[]> {
        return this.repository.find({ order: { createdDate: "DESC" } });
    }
}