import { Module, Global } from '@nestjs/common';
import * as ffmpeg from 'fluent-ffmpeg';

@Global()
@Module({
    providers: [
        {
            provide: 'FFMPEG',
            useValue: ffmpeg,
        },
    ],
    exports: ['FFMPEG'],
})
export class FfmpegModule {}
