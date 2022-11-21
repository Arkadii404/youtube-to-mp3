import { Module } from '@nestjs/common';
import { CoreModule } from '@app/core';
import { TelegramController } from './telegram.controller';
import { TelegramService } from './telegram.service';

@Module({
  imports: [CoreModule],
  controllers: [TelegramController],
  providers: [TelegramService],
})
export class TelegramModule {}
