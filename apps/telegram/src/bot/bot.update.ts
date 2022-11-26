import { Help, InjectBot, On, Message, Start, Update } from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';
import { BotService } from './bot.service';
import { Context } from '../interfaces/context.interface';
import { YoutubeService } from '@app/youtube';

@Update()
export class BotUpdate {
  constructor(
    @InjectBot()
    private readonly bot: Telegraf<Context>,
    private readonly botService: BotService,
    private readonly youtubeService: YoutubeService,
  ) {}

  @Start()
  async onStart(): Promise<string> {
    const me = await this.bot.telegram.getMe();
    return `Hey, I'm ${me.first_name}`;
  }

  @Help()
  async onHelp(): Promise<string> {
    return 'Send me any text';
  }

  @On('text')
  async onMessage(@Message('text') text: string): Promise<string> {
    const videoId = await this.youtubeService.downloadAudio(text);
    console.log('Here', videoId);
    return videoId;
  }
}
