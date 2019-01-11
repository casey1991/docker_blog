import { Injectable, Inject } from '@nestjs/common';
import { find, map, assign } from 'lodash';
import { ConfigService } from '../Config/config.service';
import * as Bull from 'bull';

@Injectable()
export class QueueService {
  private readonly queues: Array<object> = [];
  constructor(private readonly configService: ConfigService) {}
  async createQueue(name: string): Promise<any> {
    // now just create redis queue
    const bull = new Bull(name, {
      redis: {
        port: this.configService.get('REDIS_PORT'),
        host: this.configService.get('REDIS_HOST'),
      },
    });
    this.queues.push(bull);
    return bull;
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
  async addJob(
    queueName: string,
    name: string,
    data: object,
    opts: object,
  ): Promise<any> {
    let bull = await this.findOne(queueName);
    if (!bull) {
      bull = this.createQueue(queueName);
    }
    return bull.add(name, data, opts);
  }
}
