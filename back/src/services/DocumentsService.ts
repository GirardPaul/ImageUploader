import { Service } from "typedi";
import { Documents } from "../entities/Documents";
import { DocumentsDto } from "../lib/DocumentsDto";
import { DocumentsRepository } from "../repositories/DocumentsRepository";
import { CloudinaryService } from "./CloudinaryService";
import { UploadFileDto } from "../lib/UploadFileDto";

@Service()
export class DocumentsService {
  constructor(
    private readonly documentsRepository: DocumentsRepository,
    private readonly cloudinaryService: CloudinaryService
  ) {}

  public async getAll(): Promise<Documents[]> {
    return this.documentsRepository.findAllSorted();
  }

  public async postUsingUrl(dto: DocumentsDto): Promise<Documents> {
    return this.documentsRepository.save({
      label: dto.label,
      url: dto.url,
      createdDate: new Date(),
    });
  }

  public async postUsingFile(file: UploadFileDto): Promise<Documents> {
    const base64 = await this.convertBufferToBase64(file);
    const uploadedImage = await this.cloudinaryService.uploadImage(base64);
    return this.documentsRepository.save({
      label: file.getLabel(),
      url: uploadedImage.url,
      createdDate: new Date(),
    });
  }

  private async convertBufferToBase64(file: UploadFileDto): Promise<string> {
    if (file.mimetype === "image/jpeg") {
      return `data:image/jpeg;base64,${file.buffer.toString("base64")}`;
    } else if (file.mimetype === "image/png") {
      return `data:image/png;base64,${file.buffer.toString("base64")}`;
    } else if (file.mimetype === "image/jpg") {
      return `data:image/jpg;base64,${file.buffer.toString("base64")}`;
    }
  }
}
