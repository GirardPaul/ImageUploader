import { Body, Get, JsonController, Post, UploadedFile } from "routing-controllers";
import { Service } from "typedi";
import { DocumentsService } from "../services/DocumentsService";
import { Documents } from "../entities/Documents";
import { UploadFileDto } from "../lib/UploadFileDto";
import { DocumentsDto } from "../lib/DocumentsDto";

@JsonController("/documents")
@Service()
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Get()
  public async getAll(): Promise<Documents[]> {
    return this.documentsService.getAll();
  }

  @Post("/upload")
  public async postUsingUrl(
    @UploadedFile("file") file: UploadFileDto
  ): Promise<Documents> {
    return this.documentsService.postUsingFile(file);
  }
  @Post()
  public async post(
    @Body() dto: DocumentsDto
  ): Promise<Documents> {
    return this.documentsService.postUsingUrl(dto);
  }
}
