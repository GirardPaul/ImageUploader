import { Service } from "typedi";
import { AbstractRepository } from "../config/repository/AbstractRepository";
import { Documents } from "../entities/Documents";
import { AppDataSource } from "../config/db/data-source";
import { DocumentsDto } from "../lib";

@Service()
export class DocumentsRepository extends AbstractRepository<Documents> {
  constructor() {
    super(AppDataSource.getRepository(Documents));
  }

  public async findAllSorted(): Promise<Documents[]> {
    return this.repository.find({ order: { createdDate: "DESC" } });
  }

  public async findByLabel(label: string): Promise<Documents> {
    return this.repository.findOneBy({ label });
  }

  public toDto(documents: Documents): DocumentsDto {
    return {
      label: documents.label,
      url: process.env.APP_URL + "/" + documents.label,
    };
  }
  public toDtos(documents: Documents[]): DocumentsDto[] {
    return documents.map((documents) => this.toDto(documents));
  }
}
