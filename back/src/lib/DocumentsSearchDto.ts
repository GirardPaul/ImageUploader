import { IsOptional, IsString } from "class-validator";

export class DocumentsSearchDto {
    @IsOptional()
    @IsString()
    label: string;
}