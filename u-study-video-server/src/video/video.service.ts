import {
    Injectable,
    HttpStatus,
    InternalServerErrorException,
} from '@nestjs/common';
import { createReadStream, statSync } from 'fs';
import { CreateVideoDto } from './dto/create-video.dto';

import { DatabaseService } from 'src/database/database.service';
import path from 'path';
import { Prisma } from '@prisma/client';

@Injectable()
export class VideoService {
    constructor(private databaseService: DatabaseService) {}
    async streamVideo(id: string, headers: any, res: any) {
        try {
            const videoPath = (
                await this.databaseService.video.findUnique({
                    where: {
                        id: +id,
                    },
                    select: {
                        url: true,
                    },
                })
            ).url;
            // const videoPath = `assets/${id}.mp4`;
            // get size
            const { size } = statSync(videoPath);
            const videoRange = headers.range;
            console.log(videoRange);
            const parts = videoRange?.replace(/bytes=/, '').split('-');
            const start = parseInt(parts[0], 10);
            const end = parts[1] ? parseInt(parts[1], 16) : size - 1;
            console.log(size);
            console.log(start, end);

            //If you want to have less delay when receiving video and stream,
            // you can receive more chunks from the server and increase this number.
            //Do not exceed 10 to increase server performance.
            //You can use 4 or 6 or 7 instead of 2
            //Tips: Of course, it is better to do this chunk dynamically by checking the internet speed of the user
            const chunksize = end - start + 7;
            const readStreamfile = createReadStream(videoPath, {
                start,
                end,
                highWaterMark: 120,
            });
            const head = {
                'Content-Range': `bytes ${start}-${end}/${size}`,
                'Content-Length': chunksize,
            };
            res.writeHead(HttpStatus.PARTIAL_CONTENT, head); //206
            readStreamfile.pipe(res);
        } catch (error) {
            if (error) throw error;
            throw new InternalServerErrorException();
        }
    }

    async create(file: Express.Multer.File, body: CreateVideoDto) {
        console.log(file.path);
        const createVideoDto = {
            courseId: body.courseId,
            videos: [
                {
                    chapterId: body.chapterId,
                    title: file.filename,
                    duration: body.duration,
                    url: 'abc',
                },
            ],
        };
        try {
            const sequenceNum = await this.databaseService.video.count({
                where: {
                    chapterId: +body.chapterId,
                },
            });

            const videoCreated = await this.databaseService.video.create({
                data: {
                    duration: +body.duration,
                    sequenceNumber: sequenceNum + 1,
                    title: file.originalname.split('.')[0],
                    url: file.path,
                    chapterId: +body.chapterId,
                },
            });
            return videoCreated;
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException();
        }
    }

    async test() {
        const video = await this.databaseService.video.findMany();
        return video;
    }

    async findOneVideo(id: number) {
        try {
            const video = await this.databaseService.video.findUnique({
                where: {
                    id: id,
                },
            });
            return video;
        } catch {
            throw new InternalServerErrorException();
        }
    }

    async updateVideo(id: number, data: Prisma.VideoUpdateInput) {
        try {
            const videoUpdated = await this.databaseService.video.update({
                where: {
                    id: id,
                },
                data: data,
            });
            return videoUpdated;
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }
}
