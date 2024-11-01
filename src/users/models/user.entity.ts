import { serial, pgTable, varchar } from 'drizzle-orm/pg-core';
import { timestamps } from 'src/common/helpers/timestamps';

export const User = pgTable('users', {
  id: serial().primaryKey(),
  firstName: varchar(),
  lastName: varchar(),
  email: varchar().unique().notNull(),
  password: varchar().notNull(),
  ...timestamps,
});
