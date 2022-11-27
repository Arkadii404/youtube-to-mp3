import { Injectable, BadRequestException } from '@nestjs/common';
import * as ytdl from 'ytdl-core';
import { mkdir } from 'fs/promises';
import * as fs from 'fs';
import * as path from 'path';
import { YoutubeAudio } from './interfaces';

@Injectable()
export class YoutubeService {
  constructor() {
    if (!fs.existsSync(this.getLocalAudioPath())) {
      mkdir(this.getLocalAudioPath());
    }
  }

  public async downloadAudio(url: string): Promise<YoutubeAudio> {
    this.validateUrl(url);

    const videoId = ytdl.getVideoID(url);
    const videoData = await ytdl.getInfo(url);

    const isFileExists = fs.existsSync(this.getLocalAudioPath(videoId));

    if (isFileExists) {
      console.log(`Received ${videoId} from cache`);

      return this.assignAudioData(videoData, videoId);
    }

    return new Promise(async (resolve, reject) => {
      console.log(`Started download: ${videoId}`);
      console.time(videoId);

      const pathToVideo = this.getLocalAudioPath(videoId);

      ytdl(url, {
        filter: 'audioonly',
      })
        .pipe(fs.createWriteStream(pathToVideo))
        .on('close', () => {
          console.timeEnd(videoId);
          console.log(`Download completed: ${videoId}`);
          resolve(this.assignAudioData(videoData, videoId));
        });
    });
  }

  private validateUrl(url: string): never | void {
    if (!ytdl.validateURL(url)) {
      throw new BadRequestException('Invalid video url');
    }
  }

  private getLocalAudioPath(fileId?: string) {
    return path.join(__dirname, 'audios', fileId ? `${fileId}.mp3` : '');
  }

  private assignAudioData(info: ytdl.videoInfo, videoId: string): YoutubeAudio {
    return {
      pathTo: this.getLocalAudioPath(videoId),
      title: info.videoDetails.title,
      lengthSeconds: Number(info.videoDetails.lengthSeconds),
      thumbUrl: info.videoDetails.thumbnails[0].url,
    };
  }
}
