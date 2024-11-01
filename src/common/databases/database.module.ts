import { Module } from '@nestjs/common';
import { databasesProviders } from './databases.provider';

@Module({
  providers: [...databasesProviders],
  exports: [...databasesProviders],
})
export class DatabaseModule {}
