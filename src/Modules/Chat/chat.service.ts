import { Model } from 'mongoose';
import { Injectable, Inject, createParamDecorator } from '@nestjs/common';
import { Room } from './Interfaces/room.interface';
import { Message } from './Interfaces/message.interface';

@Injectable()
export class ChatService {
  constructor(
    @Inject('RoomModelToken')
    private readonly roomModel: Model<Room>,
    @Inject('MessageModelToken')
    private readonly messageModel: Model<Message>,
  ) {}
  // room operations
  async createRoom(room: {}): Promise<Room> {
    const cratedCat = new this.roomModel(room);
    return await cratedCat.save();
  }
  async updateRoom(conditions: {}, update: {}): Promise<Room> {
    return await this.roomModel.findOneAndUpdate(conditions, update, {
      new: true,
    });
  }
  async deleteRoom(conditions: {}) {
    return await this.roomModel.findOneAndRemove(conditions);
  }
  async deleteRooms(conditions: {}) {
    return await this.roomModel.deleteMany(conditions);
  }
  async findRoom(conditions: {}): Promise<Room> {
    return this.roomModel.findOne(conditions);
  }
  async findRooms(): Promise<Room[]> {
    return await this.roomModel.find().exec();
  }
  // room atom operations
  // message operations
  async createMessage(message: Message): Promise<Message> {
    const createdMessage = new this.messageModel(message);
    return await createdMessage.save();
  }
  async updateMessage(
    roomId: string,
    conditions: {},
    update: {},
  ): Promise<Message> {
    const query = { room: { $in: [roomId] }, ...conditions };
    return this.messageModel.findOneAndUpdate(query, update, { new: true });
  }
  async deleteMessage(roomId: string, conditions: {}): Promise<Message> {
    const query = { room: { $in: [roomId] }, ...conditions };
    return this.messageModel.findOneAndRemove(query);
  }
  async deleteMessages(roomId: string, conditions: {}): Promise<Message[]> {
    const query = { room: { $in: [roomId] }, ...conditions };
    return this.messageModel.deleteMany(query);
  }
  async findMessage(roomId: string, conditions: {}): Promise<Message> {
    const query = { room: { $in: [roomId] }, ...conditions };
    return this.messageModel.findOne(query);
  }
  async findMessages(roomId: string, conditions: {}): Promise<Message[]> {
    const query = {
      room: { $in: [roomId] },
      ...conditions,
    };
    return await this.messageModel.find(query);
  }
}
