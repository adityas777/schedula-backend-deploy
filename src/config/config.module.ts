import { Module } from '@nestjs/common';
import { ConfigModule as CfgMod, ConfigService } from '@nestjs/config';
import configuration from './configuration';

@Module({
  imports: [CfgMod.forRoot({ isGlobal: true, load: [configuration] })],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
