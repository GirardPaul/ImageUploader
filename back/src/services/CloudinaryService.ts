import { Service } from "typedi";
import { UploadApiResponse, v2 } from "cloudinary";
@Service()
export class CloudinaryService {
  constructor() {
    v2.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    });
  }

  public async uploadImage(
    image: string
  ): Promise<UploadApiResponse | undefined> {
    return v2.uploader.upload(image, {
        folder: "image-uploader",
        use_filename: true,
        unique_filename: true,
        overwrite: false,
    });
  }

  public async deleteImage(publicId: string): Promise<any> {
    return v2.uploader.destroy(publicId);
  }
}
