import { Module } from '@nestjs/common';
import { SessionController } from './sessions.controller';
import { SessionsService } from './sessions.service';
import { jwtModuleInstance } from 'src/common/jwt.module';
import { redisModuleInstance } from 'src/common/redis.module';
import { DatabaseModule } from 'src/common/databases/database.module';

@Module({
  imports: [DatabaseModule, redisModuleInstance, jwtModuleInstance],
  controllers: [SessionController],
  providers: [SessionsService],
})
export class SessionsModule {}
