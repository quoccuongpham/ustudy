import {
    Controller,
    Get,
    Post,
    Param,
    Res,
    Header,
    UseInterceptors,
    UploadedFile,
    Body,
    Req,
    Delete,
    Patch,
    ParseIntPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { VideoService } from './video.service';
import { Headers } from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateVideoDto } from './dto/create-video.dto';
import { Prisma } from '@prisma/client';

@Controller('video')
export class VideoController {
    constructor(private readonly videoService: VideoService) {}

    @Get('stream/:id')
    @Header('Accept-Ranges', 'bytes') //custom header for byte range
    @Header('Content-Type', 'video/mp4')
    async streamVideo(
        @Param('id') id: string,
        @Headers() headers,
        @Res() res: Response,
    ) {
        return this.videoService.streamVideo(id, headers, res);
    }

    @Get()
    test() {
        return this.videoService.test();
    }

    @Get(':id')
    findVideo(@Param('id') id) {
        return this.videoService.findOneVideo(+id);
    }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadVideo(
        @UploadedFile() file: Express.Multer.File,
        @Body()
        body: CreateVideoDto,
    ) {
        return this.videoService.create(file, body);
    }

    @Delete()
    deleteVideo() {
        //
    }

    @Patch(':id')
    updateVideo(
        @Param('id', ParseIntPipe) id: number,
        @Body() body: Prisma.VideoUpdateInput,
    ) {
        return this.videoService.updateVideo(id, body);
    }
}
