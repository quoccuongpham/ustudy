import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseService } from './database/database.service';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CoursesModule } from './courses/courses.module';
import { ChaptersModule } from './chapters/chapters.module';
import { VideosModule } from './videos/videos.module';
import { PaymentModule } from './payment/payment.module';
import { CategoryModule } from './category/category.module';

import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { GatewayModule } from './gateway/gateway.module';
import { NotesModule } from './notes/notes.module';
import { FoldersModule } from './folders/folders.module';
import { LearningModule } from './learning/learning.module';
import { CommentModule } from './comment/comment.module';
import { NotebookModule } from './notebook/notebook.module';
import { ChartModule } from './chart/chart.module';
import { ReviewModule } from './review/review.module';
import { SubtitleModule } from './subtitle/subtitle.module';
import { TransactionModule } from './transaction/transaction.module';
import { AdminModule } from './admin/admin.module';
import { ScheduleModule } from './schedule/schedule.module';
import { DiscountModule } from './discount/discount.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    UsersModule,
    CoursesModule,
    ChaptersModule,
    VideosModule,
    PaymentModule,
    CategoryModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    GatewayModule,
    NotesModule,
    FoldersModule,
    LearningModule,
    CommentModule,
    NotebookModule,
    ChartModule,
    ReviewModule,
    SubtitleModule,
    TransactionModule,
    AdminModule,
    ScheduleModule,
    DiscountModule,
  ],
  controllers: [AppController],
  providers: [AppService, DatabaseService],
})
export class AppModule {}
