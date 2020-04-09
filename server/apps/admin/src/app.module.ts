import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CoursesModule } from './courses/courses.module';
import { EpisodesModule } from './episodes/episodes.module';
import { MulterModule } from '@nestjs/platform-express';
import { CommonModule } from 'libs/common/src';

const multerCOS = require('multer-cos');

@Module({
  imports: [
    CommonModule,
    MulterModule.registerAsync({
      useFactory() {
        return {
          storage: multerCOS({
            cos: {
              SecretId: process.env.COS_SECRETID,
              SecretKey: process.env.COS_SECRETKEY,
              Bucket: process.env.COS_BUCKET,
              Region: process.env.COS_REGION,
              // 可选参数
              FileParallelLimit: 3, // 控制文件上传并发数
              ChunkParallelLimit: 3, // 控制单个文件下分片上传并发数
              ChunkSize: 1024 * 1024, // 控制分片大小，单位 B
              domain: process.env.COS_DOMAIN, //cos域名
              dir: process.env.COS_DIR, //cos文件路径
              onProgress: function(progressData) {},
            },
            destination: process.env.COS_DIR, 
            filename: 'auto',
          }),
        };
      },
    }),

    UsersModule,
    CoursesModule,
    EpisodesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
