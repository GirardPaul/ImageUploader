import { IsNotEmpty, IsUrl } from "class-validator";

export class DocumentsDto {
  id: number;
  @IsNotEmpty()
  label: string;
  @IsNotEmpty()
  @IsUrl()
  url: string;
}
