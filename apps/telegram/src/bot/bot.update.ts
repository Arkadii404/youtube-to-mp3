import {
  Help,
  InjectBot,
  On,
  Message,
  Start,
  Update,
  Ctx,
} from 'nestjs-telegraf';
import { readFile } from 'fs/promises';
import { Telegraf } from 'telegraf';
import { Context } from '../interfaces/context.interface';
import { YoutubeService } from '@app/youtube';

@Update()
export class BotUpdate {
  constructor(
    @InjectBot()
    private readonly bot: Telegraf<Context>,
    private readonly youtubeService: YoutubeService,
  ) {}

  @Start()
  async onStart(): Promise<string> {
    const me = await this.bot.telegram.getMe();
    return `Hey, I'm ${me.first_name}. Please type vido url you want to download`;
  }

  @Help()
  async onHelp(): Promise<string> {
    return 'Send me vido url, and I will send audio to you';
  }

  @On('text')
  async onMessage(
    @Message('text') text: string,
    @Ctx() ctx: Context,
  ): Promise<void> {
    const startMessage = await ctx.reply("I'm started download! Please wait");

    const { pathTo, title, thumbUrl, lengthSeconds } =
      await this.youtubeService.downloadAudio(text);

    await ctx.replyWithAudio(
      {
        source: await readFile(pathTo),
      },
      {
        title,
        duration: lengthSeconds,
        thumb: {
          url: thumbUrl,
        },
      },
    );

    await ctx.deleteMessage(startMessage.message_id);
  }
}
