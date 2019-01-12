import { Controller, Post, Get, Body, Query, Put } from '@nestjs/common';
import { RedisService } from './redis.service';

@Controller('redis')
export class RedisController {
  constructor(private readonly redisService: RedisService) {}
  @Post('setEX')
  async setEX(
    @Body('key') key: string,
    @Body('value') value: string,
    @Body('expire') expire: number,
  ) {
    const result = this.redisService.set(key, value, 'EX', expire);
    return result;
  }
  @Put('del')
  async del(@Body('key') key: string) {
    const result = this.redisService.del(key);
    return result;
  }
  @Get()
  async get(@Query('key') key: string) {
    return this.redisService.get(key);
  }
}
