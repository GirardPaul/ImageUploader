import { IsNotEmpty, IsUrl } from "class-validator";

export class DocumentsDto {
  label: string;
  @IsNotEmpty()
  @IsUrl()
  url: string;
}
