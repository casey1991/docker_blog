import { NestFactory } from '@nestjs/core';
import * as Cors from 'cors';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    transport: Transport.REDIS,
    options: { url: 'redis://redis:6379' },
  });
  // app.enableCors();
  await app.startAllMicroservicesAsync();
  await app.listen(3000);
}
bootstrap();
