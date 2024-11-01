import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './models/create-user.dto';
import * as schema from '../common/databases/databases.entities';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { hashPassword } from 'src/common/helpers/passwords.helper';

@Injectable()
export class UsersService {
  constructor(
    @Inject('DATABASE_CONNECTION') private db: NodePgDatabase<typeof schema>,
  ) {}

  async createUser(data: CreateUserDto): Promise<any> {
    // hash password
    const hashedPassword = await hashPassword(data.password);

    // create user in database
    const createdUser = await this.db
      .insert(schema.User)
      .values({
        ...data,
        password: hashedPassword,
      })
      .returning();

    return createdUser;
  }
}
