import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/common/databases/databases.entities.ts',
  out: './drizzle',
  dbCredentials: {
    url: '',
  },
});
