import {
  Body,
  Get,
  JsonController,
  Param,
  Post,
  UploadedFile,
} from "routing-controllers";
import { Service } from "typedi";
import { DocumentsService } from "../services/DocumentsService";
import { Documents } from "../entities/Documents";
import { DocumentsDto, UploadFileDto } from "../lib";

@JsonController("/documents")
@Service()
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Get()
  public async getAll(): Promise<Documents[]> {
    return this.documentsService.getAll();
  }

  @Get("/:label")
  public async download(@Param("label") label: string): Promise<Buffer> {
    return this.documentsService.getOne(label);
  }

  @Post("/upload")
  public async postUsingUrl(
    @UploadedFile("file") file: UploadFileDto
  ): Promise<Documents> {
    return this.documentsService.postUsingFile(file);
  }
  @Post()
  public async post(@Body() dto: DocumentsDto): Promise<Documents> {
    return this.documentsService.postUsingUrl(dto);
  }
}
