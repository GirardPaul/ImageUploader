import { Service } from "typedi";
import { AbstractRepository } from "../config/repository/AbstractRepository";
import { Documents } from "../entities/Documents";
import { AppDataSource } from "../config/db/data-source";
import { DocumentsDto, DocumentsSearchDto } from "../lib";
import { SelectQueryBuilder } from "typeorm";

@Service()
export class DocumentsRepository extends AbstractRepository<Documents> {
  constructor() {
    super(AppDataSource.getRepository(Documents));
  }

  public async search(dto: DocumentsSearchDto): Promise<Documents[]> {
    const queryBuilder: SelectQueryBuilder<Documents> =
      this.repository.createQueryBuilder("documents");
    if (dto.label) {
      queryBuilder.where("documents.label like :label", {
        label: `%${dto.label.trim().toLowerCase()}%`,
      });
    }
    queryBuilder.orderBy("documents.createdDate", "DESC");
    return queryBuilder.getMany();
  }

  public async findByLabel(label: string): Promise<Documents> {
    return this.repository.findOneBy({ label });
  }

  public toDto(documents: Documents): DocumentsDto {
    return {
      id: documents.id,
      label: documents.label,
      url: process.env.APP_URL + "/" + documents.label,
    };
  }
  public toDtos(documents: Documents[]): DocumentsDto[] {
    return documents.map((documents) => this.toDto(documents));
  }
}
