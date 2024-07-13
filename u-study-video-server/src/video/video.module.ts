import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { VideoService } from './video.service';
import { VideoController } from './video.controller';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { HttpModule } from '@nestjs/axios';
import * as fs from 'fs';

export const multerOptions: MulterOptions = {
    storage: diskStorage({
        destination: (req, file, cb) => {
            type Des = {
                courseId: string;
                chapterId: string;
            };
            const des: Des = req.body;

            const uploadPath = `upload/video/${des.courseId}/${des.chapterId}`;
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
            file.originalname = Buffer.from(
                file.originalname,
                'latin1',
            ).toString('utf8');
            cb(null, `${Date.now()}-${file.originalname}`);
        },
    }),
};

@Module({
    imports: [
        MulterModule.register(multerOptions),
        HttpModule.register({
            timeout: 5000,
            maxRedirects: 5,
        }),
    ],
    controllers: [VideoController],
    providers: [VideoService],
})
export class VideoModule {}
