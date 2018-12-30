import { Controller, Post, HttpCode, Query, Body } from '@nestjs/common';
import {
  Client,
  ClientProxy,
  Transport,
  MessagePattern,
} from '@nestjs/microservices';
import { Observable } from 'rxjs';
@Controller('redis')
export class RedisController {
  @Client({
    transport: Transport.REDIS,
    options: { url: 'redis://redis:6379' },
  })
  client: ClientProxy;

  @Post()
  @HttpCode(200)
  call(
    @Query('command') cmd,
    @Body('data') data: number[],
  ): Observable<number> {
    return this.client.send<number>({ cmd }, data);
  }

  @MessagePattern({ cmd: 'sum' })
  sum(data: number[]): number {
    return (data || []).reduce((a, b) => a + b);
  }
}
