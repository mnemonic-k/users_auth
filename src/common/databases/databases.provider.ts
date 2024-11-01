import { ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { entities } from './databases.entities';

export const databasesProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (config: ConfigService) => {
      return drizzle(config.get('DATABASE_URL'), { schema: entities });
    },
    inject: [ConfigService],
  },
];
