import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { Redis } from 'ioredis';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SessionsService {
  constructor(
    private jwtService: JwtService,
    @InjectRedis() private readonly redis: Redis,
    private configService: ConfigService,
  ) {}

  async createSession(user: any): Promise<string> {
    const payload = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: this.configService.get<string>('JWT_EXPIRES_IN'),
      secret: this.configService.get<string>('JWT_SECRET'),
    });

    await this.redis.set(accessToken, JSON.stringify(payload));

    return accessToken;
  }

  async findSession(accessToken: string): Promise<any> {
    const cachedSession = JSON.parse(await this.redis.get(accessToken));

    if (!cachedSession) {
      return null;
    }

    return cachedSession;
  }

  async destroy(accessToken: string): Promise<void> {
    await this.redis.del(accessToken);
  }
}
