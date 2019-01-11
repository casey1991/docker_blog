import { Injectable, Inject } from '@nestjs/common';
import { find, map, assign } from 'lodash';
import { ConfigService } from '../Config/config.service';
import * as Bull from 'bull';
@Injectable()
export class QueueService {
  private readonly queues: Array<object> = [];
  constructor(private readonly configService: ConfigService) {
    this.queues.push(
      new Bull('vertify', {
        redis: { port: 6379, host: 'redis' },
      }),
    );
  }
  async findOne(key: string) {
    const queue = find(this.queues, queue => {
      return queue.name === key;
    });
    return assign({}, { ...queue });
  }
  async findAll() {
    const results = map(this.queues, queue => {
      return assign({}, { ...queue });
    });
    return results;
  }
}
