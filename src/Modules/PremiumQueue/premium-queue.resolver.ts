import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { PremiumQueueService } from './premium-queue.service';
@Resolver('PremiumQueue')
export class PremiumQueueResolver {
  constructor(private readonly premiumQueueService: PremiumQueueService) {}
  @Query()
  async premiumQueue(@Args('name') name: string) {
    return this.premiumQueueService.findOne(name);
  }
  @Query('premiumQueues')
  async premiumQueues() {
    return this.premiumQueueService.findAll();
  }
  @Mutation('createPremiumQueue')
  async createPremiumQueue(@Args('name') name: string) {
    const result = await this.premiumQueueService.createQueue(name);
    return result;
  }
}
