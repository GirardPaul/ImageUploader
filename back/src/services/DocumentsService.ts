import { Service } from "typedi";
import { Documents } from "../entities/Documents";
import { DocumentsDto, UploadFileDto } from "../lib";
import { DocumentsRepository } from "../repositories/DocumentsRepository";
import { CloudinaryService } from "./CloudinaryService";
import { NotFoundError } from "routing-controllers";
import axios from "axios";

@Service()
export class DocumentsService {
  constructor(
    private readonly documentsRepository: DocumentsRepository,
    private readonly cloudinaryService: CloudinaryService
  ) {}

  public async getAll(): Promise<DocumentsDto[]> {
    const documents: Documents[] =
      await this.documentsRepository.findAllSorted();
    return this.documentsRepository.toDtos(documents);
  }

  public async delete(id: number): Promise<DocumentsDto> { 
    const document: Documents = await this.documentsRepository.delete(id);
    if (document && document.cloudinaryPublicUrl) {
      await this.cloudinaryService.deleteImage(document.cloudinaryPublicUrl);
    }
    return this.documentsRepository.toDto(document);
  }

  public async postUsingUrl(dto: DocumentsDto): Promise<DocumentsDto> {
    const document: Documents = await this.documentsRepository.save({
      label: dto.label,
      url: dto.url,
      createdDate: new Date(),
      cloudinaryPublicUrl: null
    });

    return this.documentsRepository.toDto(document);
  }

  public async postUsingFile(file: UploadFileDto): Promise<DocumentsDto> {
    const base64 = await this.convertBufferToBase64(file);
    const uploadedImage = await this.cloudinaryService.uploadImage(base64);
    const document: Documents = await this.documentsRepository.save({
      label: file.getLabel(),
      url: uploadedImage.url,
      createdDate: new Date(),
      cloudinaryPublicUrl: uploadedImage.public_id
    });

    return this.documentsRepository.toDto(document);
  }

  public async getOne(label: string): Promise<Buffer> {
    const document: Documents = await this.documentsRepository.findByLabel(
      label
    );
    if (!document) {
      throw new NotFoundError(`Document with label : ${label} not found`);
    }
    return this.downloadImage(document.url);
  }

  private async downloadImage(url: string): Promise<Buffer> {
    const response = await axios.get(url, {
      responseType: "arraybuffer",
    });
    const buffer = await response.data;
    return Buffer.from(buffer);
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
