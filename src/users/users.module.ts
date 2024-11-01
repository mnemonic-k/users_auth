import { Module } from '@nestjs/common';
import { UsersControllers } from './users.controller';
import { UsersService } from './users.service';
import { DatabaseModule } from 'src/common/databases/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersControllers],
  providers: [UsersService],
})
export class UsersModule {}
