import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './Modules/App/app.module';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    transport: Transport.REDIS,
    options: { url: 'redis://redis:6379' },
  });
  await app.startAllMicroservicesAsync();
  await app.listen(3000);
}
bootstrap();
