import { Model } from 'mongoose';
import { Injectable, Inject, createParamDecorator } from '@nestjs/common';
import { Room } from './Interfaces/room.interface';
import { Message } from './Interfaces/message.interface';

@Injectable()
export class ChatService {
  constructor(
    @Inject('RoomModelToken')
    private readonly roomModel: Model<Room>,
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
  // message operations
  async createMessage(roomId: string, message: Message): Promise<Message> {
    const parent = await this.findRoom({ _id: roomId });
    parent.messages.push(message);
    const subdoc = parent.messages[0];
    await parent.save();
    return subdoc;
  }
  async updateMessage(): Promise<Message> {
    return null;
  }
  async deleteMessage(): Promise<Message> {
    return null;
  }
  async deleteMessages(conditions: {}): Promise<Message[]> {
    return null;
  }
  async findMessage(roomId: string, conditions: {}): Promise<Message> {
    const parent = await this.findRoom({ _id: roomId });
    // parent.messages.find()
    return null;
  }
  async findMessages(roomId: string, conditions: {}): Promise<Message[]> {
    const parent = await this.findRoom({ _id: roomId });
    const messages = parent.messages;
    return messages;
  }
}
