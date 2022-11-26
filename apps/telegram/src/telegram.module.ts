import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { CoreModule } from '@app/core';
import { BotModule } from './bot/bot.module';

@Module({
  imports: [
    CoreModule,
    TelegrafModule.forRoot({
      token: process.env.TELEGRAM_BOT_TOKEN,
      include: [BotModule],
    }),
    BotModule,
  ],
})
export class TelegramModule {}
