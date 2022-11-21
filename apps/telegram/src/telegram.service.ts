import { Injectable } from '@nestjs/common';
import { Telegraf } from 'telegraf';

@Injectable()
export class TelegramService {
  bot;

  constructor() {
    console.log('Token', process.env.TELEGRAM_BOT_TOKEN);
    this.bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
    this.bot.start((ctx) => ctx.reply('Welcome'));
    this.bot.launch();
  }

  getHello(): string {
    return 'Hello World!';
  }
}
