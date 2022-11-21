import { Telegraf } from 'telegraf';

export const TelegramBot = (token: string): ClassDecorator => {
  return (constuctor): void => {
    const bot = new Telegraf(token);

    constuctor.prototype.telegramBot = bot;
  };
};
