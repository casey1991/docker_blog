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
  @Client({ transport: Transport.REDIS })
  client: ClientProxy;

  @Post()
  @HttpCode(200)
  call(@Query('command') cmd, @Body() data: number[]): Observable<number> {
    console.log(this.client);
    return this.client.send<number>({ cmd }, data);
  }

  @MessagePattern({ cmd: 'sum' })
  sum(data: number[]): number {
    return (data || []).reduce((a, b) => a + b);
  }
}
