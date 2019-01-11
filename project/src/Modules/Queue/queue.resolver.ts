import { Resolver, Query, Args } from '@nestjs/graphql';
import { QueueService } from './queue.service';
@Resolver('Queue')
export class QueueResolver {
  constructor(private readonly queueService: QueueService) {}
  @Query()
  async queue(@Args('name') name: string) {
    return this.queueService.findOne(name);
  }
  @Query('queues')
  async queues() {
    return this.queueService.findAll();
  }
}
