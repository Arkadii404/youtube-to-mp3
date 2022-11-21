import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { CoreService } from './core.service';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [CoreService],
  exports: [CoreService],
})
export class CoreModule {}
