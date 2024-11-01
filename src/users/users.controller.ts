import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './models/create-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../common/databases/databases.entities';
import { eq } from 'drizzle-orm';

@ApiTags('users')
@Controller('users')
export class UsersControllers {
  constructor(
    @Inject('DATABASE_CONNECTION') private db: NodePgDatabase<typeof schema>,
    private usersService: UsersService,
  ) {}

  @ApiOperation({ summary: 'Create user' })
  @HttpCode(HttpStatus.CREATED)
  @Post('')
  async createUser(@Body() body: CreateUserDto): Promise<void> {
    // check if user already exists in db
    const foundUser = await this.db.query.User.findFirst({
      where: eq(schema.User.email, body.email),
    });

    if (foundUser) {
      throw new BadRequestException({
        message: 'User already exists!!!',
        errorCode: 'USER_ALREADY_EXISTS',
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }

    await this.usersService.createUser(body);
  }
}
