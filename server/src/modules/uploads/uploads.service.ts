import { Injectable } from '@nestjs/common';
import cloudinary from '@/config/cloudinary.config';

@Injectable()
export class UploadsService {
  async uploadFile(file: Express.Multer.File) {
    const base64 = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;

    return cloudinary.uploader.upload(base64, {
      resource_type: 'auto',
      folder: 'online-doctor-solution',
    });
  }
}