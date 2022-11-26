import { Module } from '@nestjs/common';
import { BotUpdate } from './bot.update';
import { BotService } from './bot.service';
import { YoutubeModule } from '@app/youtube';

@Module({
  imports: [YoutubeModule],
  providers: [BotUpdate, BotService],
})
export class BotModule {}
