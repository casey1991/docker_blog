import {Model} from 'mongoose'
import {Injectable,Inject, createParamDecorator} from '@nestjs/common'
import {Cat} from './Interfaces/cat.interface'
import {CreateCatDto} from './Dtos/create-cat.dto'

@Injectable()
export class CatsService{
    constructor(
        @Inject('CatModelToken')
        private readonly catModel:Model<Cat>
    ){}

    async create(createCatDto:CreateCatDto):Promise<Cat>{
        const cratedCat = new this.catModel(createCatDto)
        return await cratedCat.save()
    }
    async findAll():Promise<Cat[]>{
        return await this.catModel.find().exec()
    }
}