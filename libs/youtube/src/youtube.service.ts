import { Injectable } from '@nestjs/common';
import * as ytdl from 'ytdl-core';
import * as fs from 'fs';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class YoutubeService {
  public async downloadAudio(url: string): Promise<string> {
    this.validateUrl(url);

    return new Promise((resolve, reject) => {
      const videoId = ytdl.getVideoID(url);

      console.log(`Started download: ${videoId}`);
      console.time(videoId);

      ytdl(url, {
        filter: 'audioonly',
      })
        .pipe(fs.createWriteStream('video.mp3'))
        .on('close', () => {
          console.timeEnd(videoId);
          console.log(`Download completed: ${videoId}`);
          resolve(videoId);
        });
    });
  }

  private validateUrl(url: string): never | void {
    if (!ytdl.validateURL(url)) {
      throw new BadRequestException('Invalid video url');
    }
  }
}
