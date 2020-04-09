import { NestFactory } from '@nestjs/core';
import {SwaggerModule,DocumentBuilder} from '@nestjs/swagger';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors()

  const options=new DocumentBuilder()
    .setTitle('视频网站后台管理api')
    .setDescription('后台调用服务端api')
    .setVersion('1.0')
    .addTag('cats')
    .addBearerAuth()
    .build()
  const document=SwaggerModule.createDocument(app,options);
  SwaggerModule.setup('api-docs',app,document);



  const PORT=process.env.ADMIN_PORT||3001
  await app.listen(PORT);
  console.log(`http://localhost:${PORT}/api-docs`)
}
bootstrap();
