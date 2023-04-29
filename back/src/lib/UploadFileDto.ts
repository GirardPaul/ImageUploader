import { IsIn, Max } from "class-validator";

export class UploadFileDto {
  fieldname: string;
  originalname: string;
  encoding: string;
  @IsIn(["image/jpeg", "image/png", "image/jpg"])
  mimetype: string;
  buffer: Buffer;
  @Max(5000000)
  size: number;

  getLabel(): string {
    const label: string = this.originalname.split(".").slice(0, -1).join(".");
    return label.replace(/[^a-zA-Z0-9]/g, "-");
  }
}
