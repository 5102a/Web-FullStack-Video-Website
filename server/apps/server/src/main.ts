import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()


  const options=new DocumentBuilder()
    .setTitle('视频网站前端api')
    .setDescription('前台调用服务端api')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document=SwaggerModule.createDocument(app,options);
  SwaggerModule.setup('api-docs',app,document);



  const PORT=process.env.SERVER_PORT||3002
  await app.listen(PORT);
  console.log(`http://localhost:${PORT}/api-docs`)
}
bootstrap();
