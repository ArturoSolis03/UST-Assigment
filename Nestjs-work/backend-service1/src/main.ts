import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //chnange this
  app.enableCors({
  origin: true, 
  credentials: true, 
});

  const config = new DocumentBuilder()
    .setTitle('Projects API')
    .setDescription('API for managing projects')
    .setVersion('1.0')
    .build();

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  await app.listen(3000);
}
bootstrap();
