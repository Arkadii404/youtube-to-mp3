import { Injectable } from '@nestjs/common';
import * as ytdl from 'ytdl-core';
import { mkdir } from 'fs/promises';
import * as fs from 'fs';
import * as path from 'path';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class YoutubeService {
  public async downloadAudio(url: string): Promise<string> {
    this.validateUrl(url);

    return new Promise(async (resolve, reject) => {
      const videoId = ytdl.getVideoID(url);

      console.log(`Started download: ${videoId}`);
      console.time(videoId);

      if (!fs.existsSync(path.join(__dirname, 'audios'))) {
        await mkdir(path.join(__dirname, 'audios'));
      }

      const pathToVideo = path.join(__dirname, 'audios', `${videoId}.mp3`);

      ytdl(url, {
        filter: 'audioonly',
      })
        .pipe(fs.createWriteStream(pathToVideo))
        .on('close', () => {
          console.timeEnd(videoId);
          console.log(`Download completed: ${videoId}`);
          resolve(pathToVideo);
        });
    });
  }

  private validateUrl(url: string): never | void {
    if (!ytdl.validateURL(url)) {
      throw new BadRequestException('Invalid video url');
    }
  }
}
