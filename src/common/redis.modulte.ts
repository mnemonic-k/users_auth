import { RedisModule } from '@nestjs-modules/ioredis';
import { DynamicModule } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export const redisModuleInstance: DynamicModule = RedisModule.forRootAsync({
  useFactory: (configService: ConfigService) => ({
    type: 'single',
    url: configService.get<string>('REDIS_URL'),
  }),
  inject: [ConfigService],
});
