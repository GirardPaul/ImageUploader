import { IsIn } from "class-validator";

export class UploadFileDto {
    fieldname: string;
    originalname: string;
    encoding: string;
    @IsIn(["image/jpeg", "image/png", "image/jpg"])
    mimetype: string;
    buffer: Buffer;
    size: number;

    getLabel(): string {
        return this.originalname.split('.').slice(0, -1).join('.');
    }
}