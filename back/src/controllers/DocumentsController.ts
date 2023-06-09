import {
  Body,
  Delete,
  Get,
  JsonController,
  Param,
  Post,
  UploadedFile,
} from "routing-controllers";
import { Service } from "typedi";
import { DocumentsService } from "../services/DocumentsService";
import { DocumentsDto, UploadFileDto, DocumentsSearchDto } from "../lib";

@JsonController("/documents")
@Service()
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Post("/search")
  public async search(@Body() dto: DocumentsSearchDto): Promise<DocumentsDto[]> {
    return this.documentsService.search(dto);
  }

  @Get("/:label")
  public async download(@Param("label") label: string): Promise<Buffer> {
    return this.documentsService.getOne(label);
  }

  @Delete("/:id")
  public async delete(@Param("id") id: number): Promise<DocumentsDto> {
    return this.documentsService.delete(id);
  }

  @Post("/upload")
  public async postUsingUrl(
    @UploadedFile("file") file: UploadFileDto
  ): Promise<DocumentsDto> {
    return this.documentsService.postUsingFile(file);
  }
  @Post()
  public async post(@Body() dto: DocumentsDto): Promise<DocumentsDto> {
    return this.documentsService.postUsingUrl(dto);
  }
}
