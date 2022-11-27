import { Module } from '@nestjs/common';
import { BotUpdate } from './bot.update';
import { YoutubeModule } from '@app/youtube';

@Module({
  imports: [YoutubeModule],
  providers: [BotUpdate],
})
export class BotModule {}
