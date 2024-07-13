import { Module } from '@nestjs/common';
import { VideoModule } from './video/video.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [VideoModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
