import { IsNotEmpty, IsUrl } from "class-validator";

export class DocumentsDto {
  @IsNotEmpty()
  label: string;
  @IsNotEmpty()
  @IsUrl()
  url: string;
}
