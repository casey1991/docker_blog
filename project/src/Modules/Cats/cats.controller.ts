import { Controller, Get, Post } from '@nestjs/common';
import { CatsService } from './cats.service';
// dtos
import {CreateCatDto} from './Dtos/create-cat.dto'
@Controller('cat')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}
  @Post('create')
  async createCat(createCatDto:CreateCatDto){
    return await this.catsService.create(createCatDto)
  }
  @Get('list')
  async getHello(): Promise<any[]> {
    return await this.catsService.findAll();
  }
}
