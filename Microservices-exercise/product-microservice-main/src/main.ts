import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); // <- crea app normal

  app.connectMicroservice({
    transport: Transport.TCP,
    options: { port: 3001 }, // <- microservicio TCP
  });

  await app.startAllMicroservices();
  

  const logger = new Logger('Bootstrap');
  logger.log('✅ HTTP server on port 3000');
  logger.log('✅ Microservice TCP on port 3001');
}
bootstrap();
