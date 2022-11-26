import { NestFactory } from '@nestjs/core';
import { TelegramModule } from './telegram.module';

async function bootstrap() {
  await NestFactory.createApplicationContext(TelegramModule);
}
bootstrap();
