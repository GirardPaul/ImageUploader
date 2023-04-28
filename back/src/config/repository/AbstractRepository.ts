import { Repository } from "typeorm";

export abstract class AbstractRepository<T> {
    protected readonly repository: Repository<T>;
    constructor(repository: Repository<T>) {
        this.repository = repository;
    }

    public async findAll(): Promise<T[]> {
        return this.repository.find();
    }

    public async findById(id: number | any): Promise<T> {
        return this.repository.findOne(id);
    }

    public async save(dto: T): Promise<T> {
        return this.repository.save(dto);
    }

    public async delete (id: number | any): Promise<T> {
        const entity: T = await this.repository.findOne(id);
        return this.repository.remove(entity);
    }

}