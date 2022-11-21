import { Controller, Get } from '@nestjs/common';
import { TelegramBot } from './decorators';
import { TelegramService } from './telegram.service';

@Controller()
@TelegramBot(process.env.TELEGRAM_BOT_TOKEN)
export class TelegramController {
  constructor(private readonly telegramService: TelegramService) {}

  @Get()
  getHello(): string {
    return this.telegramService.getHello();
  }
}
