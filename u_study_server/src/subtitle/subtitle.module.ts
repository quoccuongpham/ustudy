import { Module } from '@nestjs/common';
import * as fs from 'fs';
import { diskStorage } from 'multer';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { MulterModule } from '@nestjs/platform-express';

import { SubtitleService } from './subtitle.service';
import { SubtitleController } from './subtitle.controller';

export const multerOptions: MulterOptions = {
  storage: diskStorage({
    destination: (req, file, cb) => {
      type Des = {
        idVideo: string;
      };
      const des: Des = req.body;

      const uploadPath = `upload/subtitle/${des.idVideo}`;
      fs.access(uploadPath, (error) => {
        if (error) {
          fs.mkdir(uploadPath, { recursive: true }, (err) => {
            if (err) {
              console.log('Can not create folder');
            } else {
              console.log('Folder created ', uploadPath);
              cb(null, uploadPath);
            }
          });
        } else {
          cb(null, uploadPath);
        }
      });
    },
    filename: (req, file, cb) => {
      file.originalname = Buffer.from(file.originalname, 'latin1').toString(
        'utf8',
      );
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  }),
};
@Module({
  imports: [MulterModule.register(multerOptions)],
  controllers: [SubtitleController],
  providers: [SubtitleService],
})
export class SubtitleModule {}
