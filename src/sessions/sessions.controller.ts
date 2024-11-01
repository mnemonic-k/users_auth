import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from './models/login-user.dto';
import { SessionsService } from './sessions.service';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../common/databases/databases.entities';
import { eq } from 'drizzle-orm';
import { MatchPassword } from 'src/common/helpers/passwords.helper';
import { FindSessionDto } from './models/get-session.dto';
import { SessionDto } from './models/session.dto';

@ApiTags('sessions')
@Controller('sessions')
export class SessionController {
  constructor(
    @Inject('DATABASE_CONNECTION') private db: NodePgDatabase<typeof schema>,
    private sessionsService: SessionsService,
  ) {}

  @ApiOperation({ summary: 'Login user' })
  @HttpCode(HttpStatus.OK)
  @Post('')
  async logIn(@Body() body: LoginUserDto): Promise<string> {
    // find user by email
    const foundUser = await this.db.query.User.findFirst({
      where: eq(schema.User.email, body.email),
    });

    if (!foundUser) {
      throw new NotFoundException({
        message: 'User not found!',
        errorCode: 'USER_NOT_FOUND',
        statusCode: HttpStatus.NOT_FOUND,
      });
    }

    // check password
    const isMatch = await MatchPassword(body.password, foundUser.password);

    if (!isMatch) {
      throw new BadRequestException({
        message: 'Wrong credentials',
        errorCode: 'WRONG_CREDENTIALS',
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }

    const accessToken = await this.sessionsService.createSession(foundUser);

    return accessToken;
  }

  @ApiOperation({ summary: 'Find session' })
  @HttpCode(HttpStatus.OK)
  @Post('/find')
  async findSession(@Body() body: FindSessionDto): Promise<SessionDto> {
    const session = await this.sessionsService.findSession(body.accessToken);

    if (!session) {
      throw new NotFoundException({
        message: 'Session not found!',
        errorCode: 'SESSION_NOT_FOUND',
        statusCode: HttpStatus.NOT_FOUND,
      });
    }

    return new SessionDto(session);
  }
}
